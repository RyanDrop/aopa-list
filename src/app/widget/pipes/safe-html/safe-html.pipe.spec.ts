import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  const sanitizer = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', [
    'bypassSecurityTrustHtml',
  ]);
  let pipe: SafeHtmlPipe = new SafeHtmlPipe(sanitizer);

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return safe html', () => {
    const expected = '<p>test</p>';
    const spyObj = sanitizer.bypassSecurityTrustHtml as jasmine.Spy;
    spyObj.and.returnValue(expected);
    const safeHTML = pipe.transform(expected);
    expect(safeHTML).toEqual(expected);
  });
});
