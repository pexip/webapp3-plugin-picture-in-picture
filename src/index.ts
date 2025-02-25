import { registerPlugin, type RPCCallPayload } from '@pexip/plugin-api'

const plugin = await registerPlugin({
  id: 'picture-in-picture',
  version: 0
})

const pipButtonPayload: RPCCallPayload<'ui:button:add'> = {
  position: 'toolbar',
  tooltip: 'Pop out video',
  icon: 'IconOpenInNew'
}

if (window.parent.document.pictureInPictureEnabled) {
    const pipButton = await plugin.ui.addButton(pipButtonPayload)

    pipButton.onClick.add(() => {
      const elements = window.parent.document.querySelectorAll('[data-testid="video-meeting"]');
      if (elements.length > 0) {
        if (window.parent.document.pictureInPictureElement) {
          window.parent.document.exitPictureInPicture();
        } else {
          elements[0].requestPictureInPicture()
        }
      }
    })
}
