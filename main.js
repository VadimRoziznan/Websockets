!(function () {
  var e = {
      930: function () {
        const e = document.querySelector(".form-container"),
          t = e.querySelector(".authentication-form"),
          n = document.querySelector(".chat-container"),
          s = document.querySelector(".chat-message"),
          o = document.querySelector(".users-online-container"),
          a = new Date();
        let r, c;
        const l = new (class {
          constructor(e) {
            this.apiUrl = e;
          }
          async add(t) {
            const s = fetch(this.apiUrl + "users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(t),
              }),
              a = (await s).status;
            if ((console.log(a), 200 !== a))
              alert("Такой псевдоним уже существует! Придумайте другой!");
            else {
              (e.style.display = "none"),
                (n.style.display = "flex"),
                o.querySelectorAll("span").forEach((e) => {
                  e.remove();
                });
              let t = c.indexOf(r);
              t > -1 && (c.splice(t, 1), c.unshift(r)),
                c.forEach((e) => {
                  const t = document.createElement("span");
                  t.classList.add("user-block"),
                    e === r && ((e = "You"), (t.style.color = "Red")),
                    (t.textContent = e),
                    o.appendChild(t);
                });
            }
          }
        })("http://localhost:7070/");
        t.addEventListener("submit", (e) => {
          e.preventDefault(), (r = e.target.name.value), l.add({ name: r });
        });
        const d = new WebSocket("ws://localhost:3000/ws"),
          i = document.querySelector(".chat-message"),
          u = document.querySelector(".chat");
        s.addEventListener("keyup", (e) => {
          if ("Enter" === e.key) {
            const e = a.toLocaleString(),
              t = { name: r, message: i.value },
              n = JSON.stringify(t);
            d.send(n);
            const s = document.createElement("div");
            s.classList.add("message-element");
            const o = document.createElement("span"),
              c = document.createElement("span");
            o.classList.add("message-text"),
              c.classList.add("date-block"),
              (o.textContent = i.value),
              (c.textContent = "You " + e),
              s.appendChild(c),
              s.appendChild(o),
              u.appendChild(s),
              (i.value = "");
          }
        }),
          d.addEventListener("message", (e) => {
            const t = JSON.parse(e.data);
            if (t.users) {
              console.log("Received users list:", t.users),
                (c = t.users),
                o.querySelectorAll("span").forEach((e) => {
                  e.remove();
                });
              let e = c.indexOf(r);
              e > -1 && (c.splice(e, 1), c.unshift(r)),
                c.forEach((e) => {
                  const t = document.createElement("span");
                  t.classList.add("user-block"),
                    e === r && ((e = "You"), (t.style.color = "Red")),
                    (t.textContent = e),
                    o.appendChild(t);
                });
            } else {
              const { name: e, message: n } = t,
                s = a.toLocaleString(),
                o = document.createElement("div");
              o.classList.add("message-element-server");
              const r = document.createElement("span"),
                c = document.createElement("span");
              r.classList.add("message-text-server"),
                c.classList.add("date-block-server"),
                (r.textContent = n),
                (c.textContent = e + ", " + s),
                o.appendChild(c),
                o.appendChild(r),
                u.appendChild(o);
            }
          });
      },
    },
    t = {};
  function n(s) {
    var o = t[s];
    if (void 0 !== o) return o.exports;
    var a = (t[s] = { exports: {} });
    return e[s](a, a.exports, n), a.exports;
  }
  (n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return n.d(t, { a: t }), t;
  }),
    (n.d = function (e, t) {
      for (var s in t)
        n.o(t, s) &&
          !n.o(e, s) &&
          Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (function () {
      "use strict";
      n(930);
    })();
})();
