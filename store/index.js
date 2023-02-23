import axios from "axios";
import Cookie from "js-cookie";

export const state = () => ({
  shoes: [],
  token: "",
  userData: {},
});

export const getters = {
  getShoes(state) {
    return state.shoes;
  },
};

export const mutations = {
  setShoes(state, payload) {
    state.shoes = payload;
  },
  deleteShoe() {
    const shoes = state.shoes.filter((item) => item.id !== payload);
    state.shoes = shoes;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setUserData(state, payload) {
    state.userData = payload;
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    return axios
      .get("https://j-shoe-default-rtdb.firebaseio.com/shoeList.json")
      .then((response) => {
        const shoeArray = [];
        for (const key in response.data) {
          shoeArray.push({ ...response.data[key], id: key });
        }
        commit("setShoes", shoeArray);
      })
      .catch((e) => context.error(e));
  },
  deleteShoes({ commit }, shoeId) {
    return axios
      .delete(
        "https://j-shoe-default-rtdb.firebaseio.com/shoeList/" +
          shoeId +
          ".json?auth=" +
          localStorage.getItem("token")
      )
      .then((res) => commit("deleteShoe"), shoeId);
  },
  authenticateUser({ commit }, authData) {
    let webAPIKey = "AIzaSyBvY_7SPJeSt-BZRr2-ST8ijbm-2erUTIA";
    let authUrl = authData.isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

    return axios
      .post(authUrl + webAPIKey, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((response) => {
        commit("setToken", response.data.idToken);
        commit("setUserData", {
          userId: response.localId,
          email: response.email,
        });
        localStorage.setItem("token", response.data.idToken);
        Cookie.set("jwt", response.data.idToken);
        localStorage.setItem("user", JSON.stringify(userData));
        Cookie.set("acc_user", JSON.stringify(userData));
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000
        );
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000
        );
      })
      .catch((error) => console.log(error.response.data.message));
  },
};
