(function() {
  "customElements" in window && "content" in document.createElement("template");
  {
    let l = function() {
      var n = document.querySelectorAll("[data-card-group]");
      let d = null;
      Array.prototype.forEach.call(n, function(e) {
        var a = e.querySelectorAll("[data-card]");
        if (!a.length) return;
        function c(i, r) {
          Array.prototype.forEach.call(a, function(o) {
            var t = o.querySelector("img");
            t && (o === i ? (o.classList.add(r), t.getAttribute("data-active-img") && (t.src = t.getAttribute("data-active-img"), t.style.width = t.getAttribute("data-actImgWidth") + "px", t.style.height = t.getAttribute("data-actImgHeight") + "px")) : (o.classList.remove(r), t.getAttribute("data-img") && (t.src = t.getAttribute("data-img"), t.style.width = t.getAttribute("data-imgWidth") + "px", t.style.height = t.getAttribute("data-imgHeight") + "px")));
          });
        }
        c(a[0], "active"), Array.prototype.forEach.call(a, function(i) {
          i.addEventListener("mouseenter", function() {
            clearTimeout(d), d = setTimeout(() => {
              Array.prototype.forEach.call(a, function(r) {
                r.classList.remove("active");
              }), c(i, "active2");
            }, 120);
          });
        }), e.addEventListener("mouseleave", function() {
          Array.prototype.forEach.call(a, function(i) {
            i.classList.remove("active2");
          }), c(a[0], "active");
        });
      });
    };
    var s = l;
    (function() {
      var d = `
          [data-card-group] {
            width: 1400px;
            display: flex;
            height: 180px;
            border-radius: 12px;
            overflow: hidden;
            margin: 0 auto;
          }
          [data-card] {
            flex: 320;
            background: #1E2231;
            position: relative;
            color: #fff;
            cursor: pointer;
            transition: flex 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            box-sizing: border-box;
          }
          [data-card]:not(:last-child) {
            border-right: 1px solid #303545;
          }
          [data-card].active {
            flex: 440;
            background: linear-gradient(121deg, #6F63FF 0%, #425BFF 49%, #409BFB 100%);
          }
          [data-card].active2 {
            flex: 440;
            background: linear-gradient(121deg, #6F63FF 0%, #425BFF 49%, #409BFB 100%);
          }
          [data-card] .cardWrap {
            position: absolute;
            top: 64px; 
            right: 128px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          [data-card].active .cardWrap {
            display: flex;
            top: 50%;
            transform: translateY(-50%); 
            right: 40px;
          }
          [data-card].active2 .cardWrap {
            display: none;
          }
          [data-card] img {
            display: inline-block;
            width: 57px;
            height: 32px;
            object-fit: cover;
          }
          [data-card].active img {
            display: inline-block;
            width: 139px;
            height: 77px;
          }
          [data-card].active2 img {
            display: none;
          }
          [data-card] .sub {
            font-size: 14px;
            display: block;
            margin-top: 10px;
            color: #D2D3D6;
          }
          [data-card].active .sub {
            display: none;
          }
          [data-card].active2 .sub {
            display: none;
          }
          [data-card] .title {
            width: 100%;
            height: 100%;
            padding-left: 41px;
            opacity: 0;
            text-align: left;
            position: relative;
            box-sizing: border-box;
          }
          [data-card] .title .default {
            display: block;
            width: 100%;
            height: 26px;
            line-height: 26px;
            position: absolute;
            top: 50%;
            margin-top: -13px;
            font-size: 18px; 
            font-weight: 400;
          }
          [data-card] .title .description {
            display: block;
            width: 352px;
            height: 48px;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 24px;
            position: absolute;
            top: 50%;
            margin-top: -24px;
          }
          [data-card].active .title  {
            opacity: 1;
          }
          [data-card].active .title .default {
            display: block;
          }
          [data-card].active .title .description {
            display: none;
          }
          [data-card].active2 .title {
            opacity: 1;
          }
          [data-card].active2 .title .default {
            display: none;
          }
          [data-card].active2 .title .description {
            display: block;
          }
        `, e = document.createElement("style");
      e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = d : e.appendChild(document.createTextNode(d)), document.head.appendChild(e);
    })(), document.addEventListener("DOMContentLoaded", l);
  }
})();
