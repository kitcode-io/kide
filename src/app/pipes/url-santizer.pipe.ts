import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class UrlSantizerPipe implements PipeTransform {
	
  constructor(private sanitizer: DomSanitizer) {}

  transform(url): any {
    if (!url) url = '';
    if (!url.includes('http')) url = 'http://'+url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
