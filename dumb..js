// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(400, 350);

const apiKey: string = "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";

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the

//Select a frame
let selected: SceneNode;

figma.on("selectionchange", () => {
  const select: SceneNode = figma.currentPage.selection[0];

  if (select.type !== "FRAME") {
    figma.ui.postMessage({
      type: "err",
      message: "Can only select a frame",
    });
  }

  selected = select;
});

// posted message.
figma.ui.onmessage = async (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  if (!selected) {
    figma.ui.postMessage({
      type: "err",
      message: "select a frame to rename",
    });
    return;
  }

  if (!selected) {
    figma.ui.postMessage({
      type: "err",
      message: "select a frame to rename",
    });
    return;
  }

  if (msg.type === "rename") {
    console.log("called one");
    try {
      // Make a request to the OpenAI API
      const endpoint = "https://api.openai.com/v1/assistants";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1",
        "Content-Security-Policy": "connect-src https://api.openai.com",
      };
      const data = {
        model: "gpt-3.5-turbo",
        tools: [{ type: "function" }],
        name: "Figma Helper",
        instructions: `You are a personal figma designer. When given the idea of a figma frame or component being built, Generate component names based on: ${msg.new_name}`,
        // prompt: `Generate component names based on: ${msg.new_name}`,
        // max_tokens: 50,
      };

      // // Extract the generated names from the API response
      const response: any = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      // console.log(response.json());

      const result = await response.json();
      // return generatedNames;
      console.log(result, "checking");

      // selected.name = "hello there";
      // figma.ui.postMessage({
      //   type: "success",
      //   message: "Frame renamed",
      // });
      // return;

      // selected.name = "hello there";
      // const children = selected.findAll((node) => true);

      // // Rename all child frames
      // children.forEach((child) => {
      //   if (child.type === "FRAME") {
      //     child.name = "New Child Frame Name " + child.id;
      //   }
      // });
      // figma.ui.postMessage({
      //   type: "success",
      //   message: "Frame renamed",
      // });
      // return;
    } catch (error) {
      figma.ui.postMessage({
        type: "success",
        message: "Broken request",
      });
    }
  }

  figma.ui.postMessage({
    type: "err",
    message: "Hello from code.js",
  });

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};







//ssf
https://login.microsoftonline.com/common/oauth2/v2.0/authorize?auth=2&cookies=AjaxSessionKey%253DQfTyOEpggVe8MtbAkRaHcD8lDxQNOKpSlEXQFvM9%25252FGY%25252Bn58On7p%25252FNgQgyRzhOjjIRhDhvdQ2cdmmG5w5lBaqyw%25253D%25253D%253B%2520MicrosoftApplicationsTelemetryFirstLaunchTime%253D2024-01-01T23%253A07%253A30.353Z%253B%2520MicrosoftApplicationsTelemetryDeviceId%253De127d439-04ba-48ec-9ee1-c54dd911bbb6/data


https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.microsoft365.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=638397336582462871.Y2NlODAwODEtNzg0My00N2YxLTkyNzUtY2FmYTQ0NmEzNGMzYzVlYzBiZDQtNWEwZi00MmI2LWJjNTctNTc0ZDI3ZjNmNzc0&ui_locales=en-GB&mkt=en-GB&client-request-id=860c9dc2-6ee2-4dd7-a1b9-6799ac1eecda&state=BXXd5Q7iz1IT0zmcr6LJHDcHnniTr6Rh2qIKV__IWo9w8adqTDLG-0elQdJE-54DK9sJvUcvs-YXnHinj5P0Em5xWyOtqA9pA828bIIR6UFFFJckICkoXIdaLlbpoLN1KeRjLGeCY7rnxXKs1brxt1fReADiiw_17DNjnc6u831YrYEI7nRKuw9S0af7Lz5BJK5vDkNCoNfHVNBfzDwdo_nY7H83aILWVNuPjwSl2Z4JcdT9Abtq3_XVBP0nm04i8tfd7x2U4htpdHpa9575MVAvGjU95wowwF284oVbRfo&x-client-SKU=ID_NET6_0&x-client-ver=6.34.0.0&sso_reload=true