import { Dialog } from "primereact/dialog";

export const TextModal = ({ visible, setVisible, title, children }) => {
  return <Dialog header={title} visible={visible} onHide={() => setVisible(false)}
                 className={"w-11/12 md:w-8/12 lg:w-4/12"} position={"top"}
                 breakpoints={{ "960px": "75vw", "641px": "100vw" }}>
    {children}
  </Dialog>;
};