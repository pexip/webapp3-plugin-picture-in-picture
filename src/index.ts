import { Button, registerPlugin, type RPCCallPayload } from "@pexip/plugin-api";

const plugin = await registerPlugin({
  id: "picture-in-picture",
  version: 0,
});

const pipButtonPayload: RPCCallPayload<"ui:button:add"> = {
  position: "toolbar",
  tooltip: "Pop out video",
  icon: "IconOpenInNew",
};

let pipButton: Button<"toolbar"> | null = null;

let observer: MutationObserver | null = null;

let init = false;

const updatePiPButton = async () => {
  const elements = window.parent.document.querySelectorAll(
    '[data-testid="video-meeting"]'
  );

  if (init === true && elements.length != 0) {
    return;
  }

  if (window.parent.document.pictureInPictureEnabled && elements.length > 0) {
    init = true;
    if (elements.length > 0 && pipButton === null) {
      pipButton = await plugin.ui.addButton(pipButtonPayload);
      pipButton.onClick.add(() => {
        if (elements.length > 0) {
          if (window.parent.document.pictureInPictureElement) {
            window.parent.document.exitPictureInPicture();
          } else {
            elements[0].requestPictureInPicture();
          }
        }
      });
    }
  } else if (pipButton) {
    pipButton.remove();
    pipButton = null;
    init = false;
  }
};

plugin.events.participants.add(() => {
  if (!observer) {
    const elements = window.parent.document.querySelectorAll(
      '[data-testid="in-meeting-video-wrapper"]'
    );
    if (elements.length > 0) {
      observer = new MutationObserver(updatePiPButton);
      observer.observe(elements[0], {
        childList: true,
        subtree: true,
      });
    }
  }
});
// Observe DOM changes to react to element being added or removed
