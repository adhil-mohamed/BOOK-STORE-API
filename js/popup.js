
 const modal_func=(data,book_data)=>{
        let modal=document.createElement("div");
        modal.innerHTML=null
        let overlay=document.createElement("div");
        let body=document.getElementById("body")
        //body.style.position="fixed"
        modal.style.display="block"
        overlay.classList.add("overlay");
        modal.className="modal"
        body.append(overlay)
        let close=document.createElement("button");
        close.className="close";
        close.innerHTML="x";

        let modal_content=document.createElement("div")
        let book_content=document.createElement("div")
        let book_details=document.createElement("div")
        let bookimgdiv=document.createElement("div")
        let bookinfo=document.createElement("div")
        let buy_book=document.createElement("div")
        let book_review=document.createElement("div")
        let model_similer_books =document.createElement("div")
        let model_review=document.createElement("div")
        
        let similar_title=document.createElement("h2")
        let book_title=document.createElement("h2")
        let buylinks_title=document.createElement("h2")
        let review_title=document.createElement("h2")

        similar_title.innerHTML="SIMILAR BOOKS"
        book_title.innerHTML="BOOK DETAILS"
        buylinks_title.innerHTML="BUY LINKS"
        review_title.innerHTML="BOOK REVIEW"

        modal_content.className="modal_content"
        book_content.className="book_content"
        book_details.className="book_details"
        book_title.className="book_title"
        bookinfo.className="bookinfo"
        book_review.className="book_review"
        model_similer_books.className="modal-similar_books"
        buy_book.className="buy_book"
       
        let model_img=document.createElement("img")
        model_img.src = data.book_image;
        model_img.className="bookimgdiv"

        let book_img_func=(data)=>{//book img function
            let model_img=document.createElement("img")
            model_img.src = data.book_image;
            model_img.className="bookimgdiv"
            return model_img
        }
        let modalImg=book_img_func(data)
        bookimgdiv.append(book_title,model_img||modalImg);

        let book_func=(data)=>{//book details function
            let model_title= document.createElement("label")
            let model_author= document.createElement("label")
            let model_contributor= document.createElement("label")
            let model_publisher= document.createElement("label")
            let model_description= document.createElement("label")

            model_title.innerHTML = data.title;
            model_author.innerHTML = data.author;
            model_contributor.innerHTML = data.contributor;
            model_publisher.innerHTML = data.publisher;
            model_description.innerHTML = data.description;

            return[model_title,model_author,model_contributor,model_publisher,model_description]
        }
        let [model_title,model_author,model_contributor,model_publisher,model_description]=book_func(data);
        bookinfo.append("Title",model_title,"Author",model_author,"Contributor",model_contributor,"Publisher",model_publisher,"Description",model_description)
        book_details.append(bookimgdiv,bookinfo)

        let review_func=(data)=>{// review function
            let model_review_link = document.createElement("a");
            model_review_link.innerHTML = 'Book review link';
            model_review_link.href = data.book_review_link;
            let model_review_No = document.createElement("h3");
            model_review_No.innerHTML = "No review on this book";
            return (data.book_review_link == "") ? model_review_No : model_review_link
        }
        model_review.append(review_func(data));
        review_title.append(model_review)

        let similar_func=(book_data)=>{//similar books function
            let book_img = book_data.books;
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
                })
                model_similer_books_div.classList.add("model_similer_books_div")
                model_similer_books_div.append(similer_img);
                model_similer_books.append(model_similer_books_div);
               
            })
            return model_similer_books
        }
        similar_title.append( similar_func(book_data))
        
        let buy_func=(data)=>{//buy links function 
            let link=data.buy_links;
            let buy_div=document.createElement("div")
            link.forEach(el => {
                let name=document.createElement("a")
                name.innerHTML=el.name;
                name.href=el.url;
                buy_div.append(name)             
            });
            return buy_div       
        }
        buy_book=buy_func(data)
        buylinks_title.append(buy_book)

        book_content.append(book_details,buylinks_title,review_title)
        modal_content.append(book_content,similar_title)
        modal.append(close,modal_content)

        close.addEventListener("click", () => {
            modal.style.display = 'none';
            modal.innerHTML=null
            model_review.innerHTML = null;
            body.style.position="static"
            overlay.classList.remove("overlay");
        });
        return modal;
    }
    export default modal_func