import React, { useRef } from "react";
import { range, uniqueId } from "lodash";
import { Form, Table, Input, Switch, Select, Button } from "antd";
import { ContentLayout } from "../../components/style/common";
// import { WrappedFormUtils } from "antd3x/lib/form/Form";

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Column } = Table;

const tableData = range(0, 3).map((i) => ({ id: i, key: uniqueId("id_") }));

// type FormRefs = {
//   [key: string]: WrappedFormUtils;
// };

function LargeForm() {
  // const formRefs = useRef<FormRefs>({});

  return (
    <ContentLayout>
      <div>
        <Button icon="save">get data</Button>
        <Button icon="check">check data</Button>
      </div>
      <Form>
        <Table dataSource={tableData} rowKey="id">
          <Column
            title="序号"
            key="id"
            width={75}
            render={(_, __, index) => (
              <strong>
                {index} / {new Date().getSeconds().toString()}
              </strong>
            )}
          />
          <Column title="key" key="key" width={200} dataIndex="key" />
          {/* <Column
            title="form"
            key="form"
            render={(_, r) => {
              return <EditCell ref={formRefs} />;
            }}
          /> */}
        </Table>
      </Form>
    </ContentLayout>
  );
}

export default LargeForm;
