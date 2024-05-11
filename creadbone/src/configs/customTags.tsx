export const customTags: Set<string> = new Set([
    "LOGIN",
    "CONT",
    "LINE",
    "DECOR",
    "INK",
    "BORDER",
    "MESSAGE",
    "EDGE",
    "EDGE_COVER",
    "VIEW",
    "ICON",
    "SEPARATOR",
    "LOGO",
    "INFO",
    "CONTAINER",
    "HORIZONAL_WRAP",
    "CONTENT",
    "CONTENT_WRAP",
    "TEXT_LABEL",
    "TEXT",
    "CHECK",
    "BOX",
    "WRAP",
    "LIST",
    "ITEM",
    "OVERLAY",
    "GRID",
    "SCROLLER",
    "BLOCK",
    "SPACE",
    "PICTURE",
    "DEMOSPACE",
    "NAME",
    "BADGE",
    "GROUP",
    "DASHBOARD",
    "SUBTITLE",
    "SWITCH",
    "SWITCHABLE",
    "PLAYER",
    "PLAYLIST",
    "MEDIA",
    "CIRCLE",
    "LINE",
    "ROW",
    "INFOBAR",
    "THUMB",
    "DETAIL",
    "COVER",
    "CONTROLS",
    "DECOR",
    "DECORATION",
    "DOT",
    "GAP",
    "PIE",
    "TIP",
    "COL",
    "COUNT",
    "TEST",
    "ZONE",
    "LAYOUT",
    "TAG",
    "ACTION",
    "ELASTIC",
    "TOOLBAR",
    "COMMANDBAR",
    "PANEL",
    "WRAPPER",
    "WIDGET",
    "DEMO_WRAP",
    "APPLICATION",
    "THUMBS",
    "POINT",
    "HOLDER",
    "CYCLE",
    "TICK",
    "ALERT",
    "DISTRIBUTION",
    "HAMBURGER",
    "PULSE",
    "SIGNATURE",
    "SLIDER",
    "SLIDE",
    "BACK",
    "ERRORMESSAGE",
  ]);
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        [action: string]: any;
        [alert: string]: any;
        [application: string]: any;
        [badge: string]: any;
        [block: string]: any;
        [box: string]: any;
        [check: string]: any;
        [circle: string]: any;
        [col: string]: any;
        [cont: string]: any;
        [line: string]: any;
        [decor: string]: any;
        [ink: string]: any;
        [border: string]: any;
        [container: string]: any;
        [content_wrap: string]: any;
        [controls: string]: any;
        [count: string]: any;
        [cover: string]: any;
        [cycle: string]: any;
        [dashboard: string]: any;
        [decor: string]: any;
        [demo_wrap: string]: any;
        [demospace: string]: any;
        [detail: string]: any;
        [distribution: string]: any;
        [dot: string]: any;
        [elastic: string]: any;
        [errormessage: string]: any;
        [gap: string]: any;
        [sidesgap: string]: any;
        [grid: string]: any;
        [group: string]: any;
        [holder: string]: any;
        [horizonal_wrap: string]: any;
        [icon: string]: any;
        [info: string]: any;
        [infobar: string]: any;
        [item: string]: any;
        [layout: string]: any;
        [line: string]: any;
        [list: string]: any;
        [login: string]: any;
        [logo: string]: any;
        [media: string]: any;
        [message: string]: any;
        [name: string]: any;
        [overlay: string]: any;
        [panel: string]: any;
        [picture: string]: { rotate?: any };
        [pie: string]: any;
        [player: string]: any;
        [playlist: string]: any;
        [point: string]: any;
        [pulse: string]: any;
        [row: string]: any;
        [scroller: string]: any;
        [subtitle: string]: any;
        [separator: string]: { horizontal?: any };
        [space: string]: any;
        [span: string]: { large?: any };
        // [switch: string]: any;
        [switchable: string]: any;
        [tag: string]: any;
        [test: string]: any;
        [text: string]: any;
        [thumb: string]: any;
        [thumbs: string]: any;
        [tick: string]: any;
        [tip: string]: any;
        [toolbar: string]: { main?: any };
        [view: string]: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >;
        [widget: string]: any;
        [wrap: string]: any;
        [wrapper: string]: any;
        [zone: string]: any;
        [hamburger: string]: any;
        [dashboard: string]: any;
        [length: string]: any;
        [preline: string]: any;
        [monospace: string]: any;
        [size: string]: any;
        [slide: string]: any;
        [slider: string]: any;
        [slider: string]: any;
      }
    }
  }
  
  const nativeTostring = Object.prototype.toString;
  // toString override added to prototype of Custom class
  // eslint-disable-next-line
  Object.prototype.toString = function () { //NOSONAR
    const tag = this as HTMLElement;
    try {
      if (customTags.has(tag.tagName)) {
        return `[object ${tag.tagName}]`;
      }
    } catch { }
  
    return nativeTostring.call(this);
  };
  
  declare module "react" {
    interface Attributes {
      // extends React's HTMLAttributes
      autocomplete?: string | boolean;
      dashboard?: string | boolean;
      classic?: string | boolean;
      checkbox?: string | boolean;
      simple?: string | boolean;
      minimal?: string | boolean;
      radio?: string | boolean;
      effect?: string;
      border?: string;
      link?: string;
      light?: string | boolean;
      wrap?: string | boolean;
      top?: string;
      tiny?: string;
      fixed?: string | boolean;
      small?: string;
      mini?: string | boolean;
      medium?: string | boolean;
      large?: string | boolean;
      horizontal?: string;
      intro?: string;
      background?: string;
      space?: string | boolean | number;
      launcher?: string | boolean;
      backdrop?: string;
      resize?: string;
      main?: string;
      icon?: string | ReactElement;
      index?: string | number | boolean;
      ref?: any;
      options?: any;
      ellipsis?: string | boolean;
      view?: any;
      decoration?: string;
      accent?: any;
      vertical?: boolean;
      inputbox?: string;
      preline?: string;
      monospace?: string;
      type?: string;
      editable?: any;
      length?: any;
      //size?: any;
      middle?: any;
      fit?: any;
      fixlength?: string;
      title?: any;
    }
  }
  