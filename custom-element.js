class CustomElement extends HTMLElement {
  constructor() {
    super();

    console.log("constuctor");
  }

  connectedCallback() {
    this.innerHTML = this.#getHTMLMarkup();

    document.querySelector(".drop-btn").addEventListener("click", () => {
      document.querySelector(".drp_down_menu").classList.toggle("test");
    });
  }

  #getHTMLMarkup() {
    return `
      <div class="drp_btn">
      <button class="accessibility drop-btn"><i class="fas fa-universal-access"></i></button>
       <div class="drp_down_menu">
         <div class="cancle_btn"></div>
         <div class="heading"><small>Accesibility Menu</small></div>
        <div class="main">
          <div class="language">
           <select>
            <option value="English">English</option>
            <option value="English">English</option>
          </select>
        </div>
       <div class="search_data"> 
          <form>
            <input type="search" placeholder="search here"></input>
            <button type="submit"><i class="fas fa-search"></i></button>
          </form>
          <div class="content">
           <div class="column">
            <div class="single_button">
        <button class="highlight"  id="on-screen-reader-activate"><i class="fas fa-link"></i><h3>Screen Reader</h3></button>
            </div>
            <div class="single_button">
        <button class="highlight"  id="highlight-link-service"><i class="fas fa-link"></i><h3>Highlight Links</h3></button>
            </div>
            
           <div class="single_button">
               
        <button id="increase-font-service"> <i class="fas fa-text-height"></i> <h3>Bigger Text</h3></button>
           </div>
           </div>
           <div class="column">
            <div class="single_button right_border">
        <button id="font-family-service"><i class="fas fa-font"></i><h3>Font Family</h3></button>
             </div>
            
            <div class="single_button right_border"> 
        <button id="gray-scale-service"><i class="fas fa-balance-scale-right"></i><h3>GrayScale</h3></button>
             </div>
             <div class="single_button right_border">
        <button id="word-spacing-service"><i class="fas fa-text-width"></i><h3>Word Spacing</h3></button>
             </div>
            </div>
          </div>
         </div> 
        </div>
      </div>
    </div>
      `;
  }
}

customElements.define("custom-element", CustomElement);
