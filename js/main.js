import modal_func from "./popup.js";
import { getdataall, getdatefilter } from "./api_call.js";
let dashes = document.getElementById("dashes");
let loader = document.getElementById("loader");
let options = document.getElementById("genres");
let search = document.getElementById("search-bar");
let error_img, modal_div;
class Genres {
  getCard = (data) => {
    let innerbody = document.createElement("div");
    innerbody.classList.add("innerbody");
    let pic = document.createElement("img");
    pic.src = data.book_image;
    innerbody.append(pic);
    return innerbody;
  };

  getall = () => {
    loader.style.display = "block";
    getdataall().then((data) => {
      loader.style.display = "none";
      let totalBooks = data.results.lists;
      let opt_all = document.createElement("option");
      opt_all.setAttribute("value", "all");
      opt_all.innerHTML = "All";
      options.append(opt_all);
      totalBooks.forEach((data) => {
        let book_data = data;
        let opt = document.createElement("option");
        opt.setAttribute("value", data.list_name_encoded);
        opt.innerHTML = data.display_name;
        options.append(opt);
        let dash = document.createElement("div");
        dash.classList.add("dash");
        let head = document.createElement("h3");
        head.classList.add("genres");
        head.innerHTML = data.display_name;
        let datas = data.books;
        dash.append(head);
        let body = document.createElement("div");
        body.classList.add("body");
        datas.map((data) => {
          let innerbody = this.getCard(data);
          body.append(innerbody);
          dash.append(body);
          innerbody.addEventListener("click", (e) => {
            if (e.target.tagName == "IMG") {
              modal_div = modal_func(data, book_data);
            }
            dashes.append(modal_div);
          });
        });
        dashes.append(dash);
      });
    });
  };

  // getfilter = (genres_select_value) => {
  //   loader.style.display = "block";
  //   getdatafilter(genres_select_value).then((data) => {
  //     loader.style.display = "none";
  //     let totalBooks = data.results.books;
  //     let book_data = data.results;
  //     let dash = document.createElement("div");
  //     dash.classList.add("dash");
  //     let head = document.createElement("h3");
  //     head.classList.add("genres");
  //     head.innerHTML = data.results.display_name;
  //     dash.append(head);
  //     let body = document.createElement("div");
  //     totalBooks.map((data) => {
  //       body.classList.add("body");
  //       let innerbody = this.getCard(data);
  //       body.append(innerbody);
  //       dash.append(body);
  //       innerbody.addEventListener("click", () => {
  //         modal_div = modal_func(data, book_data);
  //         dashes.append(modal_div);
  //       });
  //     });
  //     dashes.append(dash);
  //   });
  // };

  getdate = (selectedValue, selected_date) => {
    loader.style.display = "block";
    getdatefilter(selectedValue, selected_date)
      .then((data) => {
        loader.style.display = "none";
        let totalBooks = data.results.books;
        let book_data = data.results;
        let dash = document.createElement("div");
        dash.classList.add("dash");
        let head = document.createElement("h3");
        head.classList.add("genres");
        head.innerHTML = data.results.display_name;
        dash.append(head);
        let body = document.createElement("div");
        totalBooks.map((data) => {
          body.classList.add("body");
          let innerbody = this.getCard(data);
          body.append(innerbody);
          dash.append(body);
          innerbody.addEventListener("click", () => {
            modal_div = modal_func(data, book_data);
            dashes.append(modal_div);
          });
        });
        dashes.innerHTML = "";
        dashes.append(dash);
      })

      .catch(
        (error_img = document.createElement("img")),
        error_img.classList.add("error"),
        (error_img.src = "./notfound.webp"),
        (error_img.height = 500),
        (error_img.width = 500),
        (dashes.innerHTML = ""),
        dashes.append(error_img)
      );
  };

  searchBooks = (searchtext) => {
    loader.style.display = "block";
    getdataall().then((data) => {
      loader.style.display = "none";

      let book_array = data.results.lists.map((data) => {
        return data.books.map((data1) => {
          return data1;
        });
      });
      book_array = book_array.flat(Infinity);

      let booksName = book_array.map((data) => {
        return data.title;
      });

      booksName = [...new Set(booksName)];

      book_array = book_array.filter((data) => {
        if ((booksName).includes(data.title)) {
          booksName = booksName.filter((test) => {
            return test !== data.title;
          });
          return data;
        }
      });

      let book_array_uni = book_array.filter((book) => {
        return book.title.toLowerCase().includes(searchtext.toLowerCase());
      });

      console.log(book_array_uni, typeof book_array_uni);

      let search_head = document.createElement("h3");
      search_head.className = "genres";
      search_head.innerHTML = `Showing results for "${searchtext}" - ${book_array_uni.length} books found`;

      if (book_array_uni == "") {
        (error_img = document.createElement("img")),
          error_img.classList.add("error"),
          (error_img.src = "./notfound.webp"),
          (error_img.height = 500),
          (error_img.width = 500),
          (dashes.innerHTML = ""),
          dashes.append(search_head, error_img);
        return;
      }

      let division = document.createElement("div");
      division.classList.add("division");
      let mainCard = document.createElement("div");
      mainCard.classList.add("mainCard");

      let totalBooks = data.results.lists;
      let book_data;
      totalBooks.forEach((data) => {
        book_data = data;
      });
      book_array_uni.map((data) => {
        let card = this.getCard(data);
        card.addEventListener("click", () => {
          console.log(book_data);
          modal_div = modal_func(data, book_data);
          dashes.append(modal_div);
        });
        mainCard.append(card);
        division.append(mainCard);
      });
      dashes.append(search_head, division);
    });
  };
}

let obj = new Genres();
obj.getall();

const debounce = (fn, delay) => {
  //debounce
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

search.addEventListener(
  "input",
  debounce(() => {
    let input_box_value = search.value;
    if (input_box_value == "") {
      dashes.innerHTML = "";
      options.innerHTML = "";
      return obj.getall();
    }
    obj.searchBooks(input_box_value);
    dashes.innerHTML = "";
  }, 850)
);

let selectedValue = document.getElementById("genres");
let genres_select_value = "all";

selectedValue.addEventListener("change", (e) => {
  genres_select_value = e.target.value;
  if (genres_select_value == "all") {
    dashes.innerHTML = "";
    obj.getall();
  } else {
    dashes.innerHTML = "";
    obj.getdate(genres_select_value, (date = "current"));
  }
});

let date = document.getElementById("publish_date");
date.addEventListener("change", (e) => {
  let selected_date = e.target.value;
  let selectedValue = document.getElementById("genres").value;
  obj.getdate(selectedValue, selected_date);
});
