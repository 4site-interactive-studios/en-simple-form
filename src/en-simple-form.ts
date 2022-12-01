export class EnSimpleForm {
  private _fields: Array<string> = [];
  private _containers: Array<string> = [];
  private _form: HTMLFormElement | null =
    document.querySelector("form.en__component");
  constructor() {
    this.log("Debug mode is on");
    this.loadOptions();
    if (!this.shouldRun()) {
      this.log("Not Running");
      const onItems = document.querySelectorAll(".en-simple-form-on");
      onItems.forEach((onItem) => {
        onItem.classList.add("en-simple-form-hide");
      });
      document.body.classList.add("en-simple-form-disabled");
      return;
    }
    // Document Load
    if (document.readyState !== "loading") {
      this.run();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        this.run();
      });
    }
  }

  private run() {
    console.log(this._containers, this._fields);
    this._containers.forEach((container) => {
      const containerElements = document.querySelectorAll(container);
      containerElements.forEach((containerElement) => {
        containerElement.classList.add("en-simple-form-hide");
      });
    });
    const offItems = document.querySelectorAll(".en-simple-form-off");
    offItems.forEach((offItem) => {
      offItem.classList.add("en-simple-form-hide");
    });
    const onItems = document.querySelectorAll(".en-simple-form-on");
    onItems.forEach((onItem) => {
      onItem.innerHTML = this.replaceValues(onItem.innerHTML);
      const onItemLinks = onItem.querySelectorAll("a");
      onItemLinks.forEach((onItemLink) => {
        onItemLink.addEventListener("click", (e) => {
          e.preventDefault();
          this.turnOff();
        });
      });
    });
    document.body.classList.add("en-simple-form-enabled");
  }

  private allFieldsHaveValues() {
    let allFieldsHaveValues = true;
    this._fields.forEach((field) => {
      console.log(field, this.getFieldValue(field));
      if (this.getFieldValue(field) === "") {
        allFieldsHaveValues = false;
      }
    });
    return allFieldsHaveValues;
  }
  private replaceValues(text: string) {
    const regex = /{(.*?)}/g;
    return text.replace(regex, (match, p1) => {
      this.log(`Replacing ${match}`);
      return this.getFieldValue(p1);
    });
  }

  private turnOff() {
    this.log("Turning off");
    this._containers.forEach((container) => {
      const containerElements = document.querySelectorAll(container);
      containerElements.forEach((containerElement) => {
        containerElement.classList.remove("en-simple-form-hide");
      });
    });
    const offItems = document.querySelectorAll(".en-simple-form-off");
    offItems.forEach((offItem) => {
      offItem.classList.remove("en-simple-form-hide");
    });
    const onItems = document.querySelectorAll(".en-simple-form-on");
    onItems.forEach((onItem) => {
      onItem.classList.add("en-simple-form-hide");
    });
    document.body.classList.remove("en-simple-form-enabled");
    document.body.classList.add("en-simple-form-disabled");
  }

  private shouldRun(): boolean {
    if (!!this.getPageId() !== true || this._form === null) {
      this.log("EN Page Not Detected");
      return false;
    }
    if (this._fields.length === 0) {
      this.log("No fields");
      return false;
    }
    if (this._containers.length === 0) {
      this.log("No containers");
      return false;
    }
    if (!this.allFieldsHaveValues()) {
      this.log("Not all fields have values");
      return false;
    }
    this.log("Running");
    return true;
  }
  getFieldValue(name: string) {
    return this._form ? new FormData(this._form).getAll(name).join(",") : "";
  }
  private getPageId() {
    if ("pageJson" in window) return (window as any)?.pageJson?.campaignPageId;
    return 0;
  }
  private loadOptions() {
    if ("enSimpleForm" in window) {
      this._fields = (window as any).enSimpleForm.fields;
      this._containers = (window as any).enSimpleForm.containers;
    }
  }
  private isDebug() {
    const regex = new RegExp("[\\?&]debug=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  private log(message: string | object) {
    if (this.isDebug()) {
      let messageString = message;
      if (typeof message === "object") {
        messageString = JSON.stringify(message);
      }

      console.log(
        `%cEN Simple Form:${messageString}`,
        "color: white; background: #2375c9; font-size: 1.2rem; font-weight: bold; padding: 2px; border-radius: 2px;"
      );
    }
  }
}
