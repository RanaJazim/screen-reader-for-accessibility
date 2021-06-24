import "./styles/styles.css";
import { CustomElement } from "../custom-element";
import { appBootstrap } from "./utils/app-bootstrap";

function main() {
  customElements.define("custom-element", CustomElement);

  appBootstrap();
}

main();
