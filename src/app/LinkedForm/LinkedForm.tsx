import React, { useCallback, useEffect } from "react";
import { Form, Switch, Input, Button, Select } from "antd";
import { ContentLayout } from "../../components/style/common";

const { Item: FormItem } = Form;
const { Option } = Select;

function LinkedForm() {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const onFinish = useCallback((val: any) => {
    console.log("val: ", val);
  }, []);

  useEffect(() => {
    setFieldsValue({
      level1switch: true,
      level2switch: true,
      level2input: "二级输入",
      level3select: 1,
      level3input: "三级输入",
    });
  }, [setFieldsValue]);

  return (
    <ContentLayout>
      <Form
        form={form}
        onFinish={onFinish}
        // initialValues={{
        //   level1switch: true,
        //   level2switch: true,
        //   level2input: "二级输入",
        //   level3select: 1,
        //   level3input: "三级输入",
        // }}
      >
        <FormItem name="level1switch" label="一级开关" valuePropName="checked">
          <Switch />
        </FormItem>
        <FormItem dependencies={["level1switch"]} noStyle>
          {({ getFieldValue }) =>
            getFieldValue("level1switch") && (
              <>
                <FormItem
                  name="level2switch"
                  label="二级开关"
                  valuePropName="checked"
                >
                  <Switch />
                </FormItem>
                <FormItem dependencies={["level2switch"]} noStyle>
                  {({ getFieldValue }) =>
                    getFieldValue("level2switch") && (
                      <>
                        <FormItem name="level2input" label="二级输入">
                          <Input />
                        </FormItem>
                        <FormItem name="level3select" label="三级选择">
                          <Select placeholder="请选择">
                            <Option value={1}>Google</Option>
                            <Option value={2}>Twitter</Option>
                          </Select>
                        </FormItem>
                        <FormItem dependencies={["level3select"]} noStyle>
                          {({ getFieldValue }) =>
                            +getFieldValue("level3select") === 1 && (
                              <FormItem name="level3input" label="三级输入">
                                <Input />
                              </FormItem>
                            )
                          }
                        </FormItem>
                      </>
                    )
                  }
                </FormItem>
              </>
            )
          }
        </FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </ContentLayout>
  );
}

export default LinkedForm;
