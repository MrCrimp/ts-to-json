export const camelCased = (c: string) => (c 
  ? 
    c[0].toUpperCase() + 
      c.replace(
        /-([a-z])/g, 
        g => g[1].toUpperCase()
      ).substr(1) 
  : 
    '');  

export const getInterfaceName = (text:string) => text.match(/(?![export|interface]).(\w+).(?=\{+)/ig)[0];