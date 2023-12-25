import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


export function RestaurantSettingsComponent() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Update Successfully!'
        });
    }

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div className="text-gray-400 text-center">
            <PlusOutlined />
            <p>Upload</p>
        </div>
    );

    const handleOnFinish = (values: any) => {
        console.log("Received values: ", values);
    }

    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

    return (
        <div className="flex flex-col gap-2 mx-16">
            {contextHolder}
            <h3 className="font-bold py-2 text-[23px] text-purple-700">Restaurant Settings</h3>
            <Form
                {...formItemLayout}
                className=""
                name="restaurant-settings"
                style={{ maxWidth: 600 }}
                onFinish={handleOnFinish}
            >
                <Form.Item
                    label={"Name"}
                    name={"name"}
                >
                    <Input
                        className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                        placeholder="Update Name"
                    />
                </Form.Item>

                <Form.Item
                    label={"Location"}
                    name={"location"}
                >
                    <Input
                        className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                        placeholder="Update Location"
                    />
                </Form.Item>

                <Form.Item
                    label={"Image"}
                    name={"image"}
                >
                    <Upload
                        name="restaurant-image"
                        listType={"picture-card"}
                        fileList={undefined}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>

                </Form.Item>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <Image src={previewImage} alt={"Image"} width={100} height={100} style={{ width: "100%" }} />
                </Modal>

                <Form.Item>
                    <Button
                        type={"default"}
                        htmlType={"submit"}
                        className="!bg-purple-700 !text-white text-lg !h-12 font-semibold !hover:text-white"
                        onClick={success}
                    >
                        Update Settings
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
