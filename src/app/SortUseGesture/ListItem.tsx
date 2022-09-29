import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import { DragBtn } from "../../components/style/common";

interface Props {
  content: React.ReactNode;
}

function ListItem(props: Props) {
  const { content } = props;

  return (
    <>
      {content}
      <DragBtn>
        <UnorderedListOutlined />
      </DragBtn>
    </>
  );
}

export default ListItem;
