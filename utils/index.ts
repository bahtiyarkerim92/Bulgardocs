export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  
  export function toRoman(num: number): string {
    const lookup: { [key: string]: number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
  
    let roman = '';
    for (const i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman + '.';
  }
  
  export async function loadLocaleMessages(locale, page) {
    try {
      const messages = await import(`~/locales/${locale}/home.ts`);
      return messages.default || {};
    } catch (error) {
      console.error(`Failed to load messages for ${locale}/${page}:`, error);
      return {};
    }
  }
  
  export function focusNextInput(event: Event) {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    const nextInput = form.elements[index + 1];
        if (form.elements[index + 1]) {
          nextInput.focus();
          nextInput.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center' });
        }
  }