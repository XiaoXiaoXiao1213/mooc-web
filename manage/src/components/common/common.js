import { MessageBox } from "element-ui";

export const alertEx = async function(content, title){
    try {
        await MessageBox.confirm(content, title, {
          type: "warning"
        });
        return true;
      } catch (e) {
        return false;
      }
}