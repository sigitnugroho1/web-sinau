<template>
  <div class="note">
    <div v-if="!participant" class="table-wrapper">
      <h1>Participant</h1>
      <input type="text" v-model="search" placeholder="Search title.." />
      <button class="btn btn-sm btn-success" @click="() => doAddOrEdit()">Add Participant</button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data.length === 0">
            <td colspan="4">
              <span v-if="isLoading">Memuat data...</span>
              <span v-else>No data found</span>
            </td>
          </tr>
          <tr v-else v-for="(item, index) in data" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.address}}</td>
            <td class="button-action" width="20%">
              <button class="btn btn-sm btn-info" @click="() => doAddOrEdit(item)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="() => doDelete(item)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form v-else class="form-note" @submit="doSave">
      <h2
        class="form-note-heading"
      >{{participant.id ? "Change participant" : "Add new participant"}}</h2>
      <input
        v-model="participant.name"
        type="text"
        placeholder="Name"
        autofocus
        class="form-control"
        :class="{'is-invalid': hasSubmit && participant.name.length === 0}"
      />
      <input
        v-model="participant.phone"
        type="text"
        placeholder="Phone Number"
        class="form-control"
        :class="{'is-invalid': hasSubmit && participant.phone.length === 0}"
      />
      <input
        v-model="participant.email"
        type="email"
        placeholder="Email"
        class="form-control"
        :class="{'is-invalid': hasSubmit && participant.email.length === 0}"
      />
      <textarea
        v-model="participant.address"
        type="text"
        placeholder="Address"
        class="form-control"
        :class="{'is-invalid': hasSubmit && participant.address.length === 0}"
      />
      <div class="btn-submit text-lg-right">
        <button class="btn btn-m btn-dark" type="button" @click="doReset">Cancel</button>
        <button class="btn btn-m btn-primary" type="submit">
          <template v-if="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
          </template>
          <template v-else>
            <span v-if="participant.id">Update</span>
            <span v-else>Save</span>
          </template>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

import Participant from "../entity/Participant";
import User from "../entity/User";

@Component({ name: "note-page" })
export default class NotePage extends Vue {
  public data: Array<Participant> = [];

  public participant: Participant | null = null;

  public isLoading: boolean = false;

  public hasSubmit: boolean = false;

  public get isValid(): boolean {
    return (
      this.participant != null &&
      this.participant.name !== "" &&
      this.participant.phone !== "" &&
      this.participant.address !== ""
    );
  }

  public mounted() {
    this.doReset();
  }

  public doReset() {
    this.hasSubmit = false;
    this.isLoading = false;

    this.participant = null;

    this.doFind();
  }

  public doFind() {
    this.isLoading = true;

    //@ts-ignore
    const user: User = this.$doCookieOperation("session");

    axios
      .get("http://192.168.0.152:9000/participant", {
        headers: { Authorization: user.token }
      })
      .then(response => {
        if (
          response.data.status == "200" &&
          Array.isArray(response.data.data)
        ) {
          this.data = response.data.data;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public doAddOrEdit(participant?: Participant) {
    this.participant = participant ? participant : new Participant();
  }

  public doDelete(participant: Participant) {
    if (!this.isLoading && participant.id) {
      if (confirm("are you sure to delete " + participant.name + " ?")) {
        this.isLoading = true;

        //@ts-ignore
        const user: User = this.$doCookieOperation("session");

        this.handleResponse(
          axios.delete(
            "http://192.168.0.152:9000/participant/" + participant.id,
            {
              headers: { Authorization: user.token }
            }
          )
        );
      }
    }
  }

  public doSave(event: Event): void {
    event.preventDefault();

    this.hasSubmit = true;

    if (!this.isLoading && this.participant != null) {
      if (this.isValid) {
        this.isLoading = true;

        //@ts-ignore
        const user: User = this.$doCookieOperation("session");

        this.handleResponse(
          axios.request({
            url: "http://192.168.0.152:9000/participant",
            method: this.participant.id ? "PUT" : "POST",
            headers: { Authorization: user.token },
            data: this.participant
          })
        );
      } else {
        this.$notify({
          group: "default",
          type: "error",
          title: "Note",
          text: "Please fill all field"
        });
      }
    }
  }

  public handleResponse(promise: Promise<any>) {
    promise
      .then(() => {
        this.$notify({
          group: "default",
          type: "success",
          title: "Note",
          text: "Success!"
        });

        this.doReset();
      })
      .catch(error => {
        this.$notify({
          group: "default",
          type: "error",
          title: "Note",
          text: error.toString()
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.note {
  width: 80%;
  margin: 0 auto;

  h1 {
    text-align: center;
  }

  .table-wrapper {
    .btn-success {
      margin-bottom: 15px;
    }

    table {
      thead th:last-child {
        text-align: center;
      }

      td {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        vertical-align: middle;
      }

      td[colspan]:not([colspan="1"]) {
        text-align: center;
      }

      .button-action {
        text-align: center;

        button {
          margin: 5px;
        }
      }
    }
  }

  .form-note {
    max-width: 80%;
    padding: 15px 35px 15px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .form-note-heading {
      margin-bottom: 20px;
    }

    .form-control {
      position: relative;
      font-size: 16px;
      height: auto;
      padding: 10px;

      &:focus {
        z-index: 2;
      }
    }

    input,
    textarea {
      margin-bottom: 15px;
    }

    .btn-submit button {
      margin: 5px;
    }
  }
}
</style>
