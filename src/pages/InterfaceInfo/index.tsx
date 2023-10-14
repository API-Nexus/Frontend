import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, Card, Descriptions, Divider, Form, Input, List, message} from 'antd';
import {
    getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,
} from "@/services/KaAPI-backend/interfaceInfoController";
import {useParams} from "@@/exports";
/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<API.InterfaceInfo>();
    const [invokeRes, setInvokeRes] = useState<any>();
    const [invokeLoading, setInvokeLoading] = useState(false);

    const params = useParams();

    const loadData = async () => {
        if (!params.id) {
            message.error('params not exist');
            return;
        }
        setLoading(true);
        try {
            const res = await getInterfaceInfoByIdUsingGET({
                id: Number(params.id),
            });
            setData(res.data);
        } catch (error: any) {
            message.error('failed，' + error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const onFinish = async (values: any) => {
        if (!params.id) {
            message.error('API not exists');
            return;
        }
        setInvokeLoading(true);
        try {
            console.log("reach here")
            console.log(params.id)
            console.log(values)
            const res = await invokeInterfaceInfoUsingPOST({
                id: params.id,
                ...values,
            });
            setInvokeRes(res.data);
            message.success('success');
        } catch (error: any) {
            message.error('failed，' + error.message);
        }
        setInvokeLoading(false);
    };

    return (
        <PageContainer title="API document">
            <Card>
                {data ? (
                    <Descriptions title={data.name} column={1}>
                        <Descriptions.Item label="status">{data.status ? 'open' : 'close'}</Descriptions.Item>
                        <Descriptions.Item label="description">{data.description}</Descriptions.Item>
                        <Descriptions.Item label="url">{data.url}</Descriptions.Item>
                        <Descriptions.Item label="method">{data.method}</Descriptions.Item>
                        <Descriptions.Item label="Request Params">{data.requestParams}</Descriptions.Item>
                        <Descriptions.Item label="Request Header">{data.requestHeader}</Descriptions.Item>
                        <Descriptions.Item label="Response Header">{data.responseHeader}</Descriptions.Item>
                        <Descriptions.Item label="Create Time">{data.createTime}</Descriptions.Item>
                        <Descriptions.Item label="Update Time">{data.updateTime}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <>API not exists</>
                )}
            </Card>
            <Divider />
            <Card title="Online Testing">
                <Form name="invoke" layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Request Params" name="userRequestParams">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Invoke
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Divider />
            <Card title="Result" loading={invokeLoading}>
                {invokeRes}
            </Card>
        </PageContainer>
    );
};

export default Index;
