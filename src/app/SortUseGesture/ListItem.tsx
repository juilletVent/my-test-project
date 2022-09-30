import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { DragBtn } from "../../components/style/common";

interface Props {
  content: React.ReactNode;
  grabHandler: ReactDOMAttributes;
}

function ListItem(props: Props) {
  const { content, grabHandler } = props;

  return (
    <>
      {content}
      <DragBtn {...grabHandler}>
        <UnorderedListOutlined />
      </DragBtn>
    </>
  );
}

export default ListItem;
