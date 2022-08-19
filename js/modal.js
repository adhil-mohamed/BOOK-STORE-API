class Model{
    mymodal=(data,book_data)=>{
    let model_similer_books = document.querySelector('.modal-similar_books');
    let modal=document.getElementById("modal");
    modal.style.display="block"
    model_similer_books.innerHTML = '';
    let model_review = document.querySelector(".review_link");

    let model_img = document.querySelector(".model-img"); //img
    model_img.src = data.book_image;

    let model_title = document.querySelector("#title");//title
    model_title.innerHTML = data.title;

    let model_author = document.querySelector("#author");//author
    model_author.innerHTML = data.author;
 
    let model_contributor = document.querySelector("#contributor");//contributor
    model_contributor.innerHTML = data.contributor;

    let model_publisher = document.querySelector("#publisher"); //publisher
    model_publisher.innerHTML = data.publisher;

    let model_description = document.querySelector("#description");//description
    model_description.innerHTML = data.description;

    let model_review_link = document.createElement("a");// review
    model_review_link.innerHTML = 'Book review link';
    model_review_link.href = data.book_review_link;
    let model_review_No = document.createElement("h3");
    model_review_No.innerHTML = "No review on this book";
    model_review.append((data.book_review_link == "") ? model_review_No : model_review_link);

    let link=data.buy_links;//buy link array
    let Amazon = document.querySelector(".Amazon");
    Amazon.href = link[0].url;
    let Apple = document.querySelector(".Apple");
    Apple.href = link[1].url;
    let Barnes = document.querySelector(".Barnes");
    Barnes.href = link[2].url;
    let Books_A_Million = document.querySelector(".Books-A-Million");
    Books_A_Million.href = link[3].url;
    let Bookshop = document.querySelector(".Bookshop");
    Bookshop.href = link[4].url;
    let IndieBound = document.querySelector(".IndieBound");
    IndieBound.href = link[5].url;

    let close = document.querySelector('.close');//modal close
    close.addEventListener("click", () => {
            modal.style.display = 'none';
            model_review.innerHTML = '';
    });

    let book_img = book_data.books;//similar books
        book_img.map(data => {
            let similer_img = document.createElement("img");
            similer_img.src = data.book_image;
            similer_img.height = '390';
            similer_img.width = '265';
            let model_similer_books_div = document.createElement("div");
            model_similer_books_div.addEventListener("click", () => {
                model_img.src = data.book_image;
                model_title.innerHTML = data.title;
                model_author.innerHTML = data.author;
                model_contributor.innerHTML = data.contributor;
                model_publisher.innerHTML = data.publisher;
                model_description.innerHTML = data.description;
                model_review_link.href = data.book_review_link;

                let link = data.buy_links;
                    link.forEach(el=>{
                        let name=document.createElement("a")
                        name.innerHTML=el.name;
                        name.href=el.url;
                    })
            })
            model_similer_books_div.classList.add("model_similer_books_div")
            model_similer_books_div.append(similer_img);
            model_similer_books.append(model_similer_books_div);
        })
}
}
export {Model} ;