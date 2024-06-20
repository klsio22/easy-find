export class PreviewPdfService {
  private adobeDCView: any;
  initAdobeDCView(clientId: string, divId: string): void {
    const script = document.createElement('script');
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
    document.body.prepend(script);

    script.onload = () => {
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        this.adobeDCView = new (window as any).AdobeDC.View({
          clientId: clientId,
          divId: divId,
        });
      });
    };
  }

  previewPdf(url: string, fileName: string): void {
    if (!this.adobeDCView) {
      console.error('Adobe DC View is not initialized.');
      return;
    }

    this.adobeDCView.previewFile(
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
    );
  }
}
