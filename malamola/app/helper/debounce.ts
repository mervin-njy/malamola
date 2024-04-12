export const debounce = (fn: (...args: any[]) => void, delay: number = 300): ((...args: any[]) => void) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };