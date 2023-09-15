import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/notes`;

export default class NoteAPI {
  static async create(note) {
    return (await axios.post(`${BASE_URL}`, note)).data;
  }

  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data;
  }

  static async fetchById(noteId) {
    return (await axios.get(`${BASE_URL}/${noteId}`)).data;
  }

  static async deleteById(noteId) {
    return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
  }

  static async updateById(note) {
    return (await axios.patch(`${BASE_URL}/${note.id}`, note)).data;
  }
}
