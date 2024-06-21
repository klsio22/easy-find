export class PreviewPdfService {
  private adobeDCView: any;

  initAdobeDCView(clientId: string, divId: string): void {
    const script = document.createElement('script');
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
    document.body.prepend(script);

    script.onload = () => {
      console.log('Adobe View SDK script loaded.');
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        console.log('Adobe View SDK ready event fired.');
        this.adobeDCView = new (window as any).AdobeDC.View({
          clientId: clientId,
          divId: divId,
        });
        console.log('AdobeDC.View instance created.');
      });
    };

    script.onerror = () => {
      console.error('Failed to load Adobe View SDK script.');
    };
  }

  previewPdf(url: string, fileName: string): void {
    if (!this.adobeDCView) {
      console.error('Adobe DC View is not initialized.');
      return;
    }

    console.log(`Previewing PDF: ${url}`);
    this.adobeDCView
      .previewFile(
        {
          content: {
            location: {
              url: url,
            },
          },
          metaData: {
            fileName: fileName,
          },
        },
        {
          embedMode: 'SIZED_CONTAINER',
        },
      )
      .catch((error: any) => {
        console.error('Error in previewFile:', error);
      });
  }
}
