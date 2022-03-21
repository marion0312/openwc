import { LitElement, html, css } from 'lit';


function convertHtml( text ){
  const htmlToCovert = document.createElement("p");
  htmlToCovert.innerHTML = text;
  const finalText = htmlToCovert.textContent || htmlToCovert.innerText || "";

  return finalText;
}

function search( text ){
  if (text.target.value === '') {
    fetch(`https://api.tvmaze.com/shows`)
      .then((r) => r.json())
      .then((r) => {
        this.response = r;
        console.log(this.response)
      })
      .catch((err) => console.log(err));
      return false;
  }
  
  fetch(`https://api.tvmaze.com/search/shows?q=${text.target.value}}`)
    .then((r) => r.json())
    .then((r) => {
      this.response = r.map( a => a.show);
    })
    .catch((err) => console.log(err));

    return false;
}

export class CodalityShell extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      response: { type: Array },
    };
  }

  static get styles() {
    return css`
      body {
        background-color: gray;
      }

      p {
        font-size: 14px;
      }

      .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      @media (min-width: 768px) {
        .container {
          width: 750px;
        }
      }
      @media (min-width: 992px) {
        .container {
          width: 970px;
        }
      }
      @media (min-width: 1200px) {
        .container {
          width: 1170px;
        }
      }

      .card {
        border: 1px solid none;
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 10px;
        height: 10em;
        background-color: white;
        background: #ffffff;
        box-shadow: 0 8px 8px -4px gray;
      }

      .card-image {
        height: 10em;
      }

      .card-image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 40px;
      }

      .movie-title {
        font-weight: bold;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
                line-clamp: 1; 
        -webkit-box-orient: vertical;
      }

      .card-body {
        padding: 1em;
      }

      .movie-description {
        margin-top: 20px;
        padding-left: 10px;
        padding-right: 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
                line-clamp: 3; 
        -webkit-box-orient: vertical;
      }

      .movie-rating {
        margin-top: 0;
      }

      .center {
        text-align: center;
      }

      .search-bar {
        font-size: 20px;
        margin: 2em;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.response = [];
  }

  firstUpdated() {
    fetch(`https://api.tvmaze.com/shows`)
      .then((r) => r.json())
      .then((r) => {
        this.response = r;
        console.log(this.response)
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {response} = this;
    return html`
      <main class="container">
        <div class="center">
          <input type="text" @input=${search} class="search-bar" placeholder="Enter text to search">
        </div>

        <div class="card-container">
          ${response.length === 0 ? "Nothing to display" : ""}
          ${response.map((item) => html`
            <div class="card">
              <div class="card-image">
                <img alt="source" src="${item.image == null ? "https://via.placeholder.com/120x170.png?text=Poster" : item.image.medium}"/>
              </div>
              <div class="card-body">
                <p class="movie-title">${item.name}</p>
                <p class="movie-rating">${item.rating.average == null ? "No rating yet" : `Rating: ${item.rating.average}/10`}</p>

                <p class="movie-description">${convertHtml(item.summary)}</p>
              </div>
            </div>
          `)}
        </div>


      </main>
    `;
  }
}