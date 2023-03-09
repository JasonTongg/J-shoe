import axios from "axios";
import Cookie from "js-cookie";

export const state = () => ({
  shoes: [],
  token: "",
  userData: {},
  cart: [],
});

export const getters = {
  getShoes(state) {
    return state.shoes;
  },
  getUserData(state) {
    return state.userData;
  },
  getCart(state) {
    return state.cart;
  },
  isAuthenticated(state) {
    return state.token != null;
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
  addNewShoe(state, payload) {
    return state.shoes.push(payload);
  },
  getShoe(state, payload) {
    const shoe = state.shoes.filter((item) => item.id === payload.id);
    state.shoes[shoe.id] = payload;
  },
  addToCart(state, payload) {
    return state.cart.push(payload);
  },
  removeToCart(state, payload) {
    const cart = state.cart.filter((item) => item.id[0] !== payload);
    state.cart = cart;
  },
  setToCart(state, payload) {
    state.cart = payload;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    let url1 = "https://j-shoe-default-rtdb.firebaseio.com/shoeList.json";
    let promise1 = axios.get(url1).then(function (response) {
      const shoeArray = [];
      for (const key in response.data) {
        shoeArray.push({ ...response.data[key], id: key });
      }
      commit("setShoes", shoeArray);
    });

    let promise2 = axios
      .get(
        `https://j-shoe-default-rtdb.firebaseio.com/accountCart.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidG9uaSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9qLXNob2UiLCJhdWQiOiJqLXNob2UiLCJhdXRoX3RpbWUiOjE2NzgyNTI0MDUsInVzZXJfaWQiOiJtRWVPaTBGeUtPWnBCeGJkY0NKalRwYTIzUXIxIiwic3ViIjoibUVlT2kwRnlLT1pwQnhiZGNDSmpUcGEyM1FyMSIsImlhdCI6MTY3ODI1MjQwNSwiZXhwIjoxNjc4MjU2MDA1LCJlbWFpbCI6ImFib3l0b25nMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWJveXRvbmcxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.X-YxBgIgY5F5YbxrDKUo-uOjOGNUliAd0kQ8eHS2TfVh6I2PCceQiv77yF94L_ltvtVpdV7YN5fcFx_0EAhGbkHgDYJKZnnJN403PVya-ZkigF_VqKdbJtnXikBGj9ECEMiYOGwyMrYfJ75ByRuTVO_NtqLuhI-DeUfOERmWD9KSdKIbwtYPyz_ZiG4Ji7LJIr8enjAkDH22BeqVgvmx0lsxYk47-zmZqb_1l-Dz1BZI1wek388iugQHLm7vmF7zIKEFN0bi7UMQAHBPo75CcA7DfSaGhRdhs6r8FNJ5MboWHvwF09PCsccYsykylNkVmU1GOC2MTyXCCDQn4ccbOQ`
      )
      .then((response) => {
        if (response.data) {
          const cartArray = [];
          for (const key in response.data) {
            cartArray.push({ ...response.data[key], id: [key] });
          }
          commit("setToCart", cartArray);
        } else {
          commit("setToCart", []);
        }
      });
    return Promise.all([promise1, promise2]).then();
  },
  initAuth({ commit, dispatch }, req) {
    let user;
    let token;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));

      const accUserCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("acc_user="));

      const userCookie = accUserCookie.substr(accUserCookie.indexOf("=") + 1);
      user = JSON.parse(decodeURIComponent(userCookie));

      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    } else {
      token = localStorage.getItem("token");
      user = JSON.parse(localStorage.getItem("user"));
    }
    commit("setToken", token);
    commit("setUserData", user);
  },
  addUserCart({ state, commit }, shoe) {
    return axios
      .post(
        `https://j-shoe-default-rtdb.firebaseio.com/accountCart.json?auth=` +
          localStorage.getItem("token"),
        {
          ...shoe,
          userId: localStorage.getItem("userId"),
        }
      )
      .then((response) => {
        commit("addToCart", {
          ...shoe,
          userId: localStorage.getItem("userId"),
        });
      });
  },
  deleteUserCart({ state, commit }, shoeId) {
    return axios
      .delete(
        `https://j-shoe-default-rtdb.firebaseio.com/accountCart/` +
          shoeId +
          `.json?auth=` +
          localStorage.getItem("token")
      )
      .then((response) => {
        commit("removeToCart", shoeId);
      });
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
  addShoe({ commit, state }, shoe) {
    return axios
      .post(
        "https://j-shoe-default-rtdb.firebaseio.com/shoeList.json?auth=" +
          localStorage.getItem("token"),
        {
          ...shoe,
          userId: JSON.parse(localStorage.getItem("user")).userId,
        }
      )
      .then((response) => {
        commit("addNewShoe", {
          ...shoe,
          userId: state.userData.userId,
        });
      });
  },
  updateShoe({ dispatch, state }, shoe) {
    return axios
      .put(
        "https://j-shoe-default-rtdb.firebaseio.com/shoeList/" +
          shoe.id +
          ".json?auth=" +
          localStorage.getItem("token"),
        shoe.newShoe
      )
      .then((res) => dispatch("getShoe"));
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
        displayName: authData.userName,
        returnSecureToken: true,
      })
      .then((response) => {
        commit("setToken", response.data.idToken);
        commit("setUserData", {
          userId: response.data.localId,
          email: response.data.email,
          userName: response.data.displayName,
        });
        localStorage.setItem("token", response.data.idToken);
        Cookie.set("jwt", response.data.idToken);
        Cookie.set(
          "acc_user",
          JSON.stringify({
            userId: response.data.localId,
            email: response.data.email,
            userName: response.data.displayName,
          })
        );
        // if (authData.isLogin === false) {
        //   localStorage.setItem(
        //     "user",
        //     JSON.stringify({
        //       userId: response.data.localId,
        //       email: response.data.email,
        //       userName: response.data.displayName,
        //     })
        //   );
        // } else {
        //   localStorage.setItem("userId", response.data.localId);
        // }
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.localId,
            email: response.data.email,
            userName: response.data.displayName,
          })
        );
        localStorage.setItem("userId", response.data.localId);
      })
      .catch((error) => console.log(error.response.data.message));
  },
  userLogout({ commit }) {
    commit("setUserData", {});
  },
};
