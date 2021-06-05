import {useState} from 'react';
import config from 'src/commons/config-hoc';
import {Button, Form, Space} from 'antd';
import {
    PageContent,
    QueryBar,
    FormItem,
    Table,
    Pagination,
    Operator,
    ToolBar,
} from '@ra-lib/components';
import SystemSelect from 'src/pages/menus/SystemSelect';
import EditModal from './EditModal';
import styles from './style.less';
import {IS_MOBILE} from 'src/config';

export default config({
    path: '/roles',
})(function Role(props) {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [conditions, setConditions] = useState({});
    const [record, setRecord] = useState(null);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const params = {
        ...conditions,
        pageNum,
        pageSize,
    };

    // 获取角色列表
    const {
        data: {
            dataSource,
            total,
        } = {},
    } = props.ajax.useGet('/role/get', params, [conditions, pageNum, pageSize], {
        setLoading,
        // mountFire: false, // 初始化不查询
        formatResult: res => {
            return {
                dataSource: res?.content || [],
                total: window.parseInt(res?.totalElements, 10) || 0,
            };
        },
    });

    // 批量删除
    const {run: deleteRole} = props.ajax.useGet('/role/del', null, {setLoading, successTip: '批量删除成功！'});

    const columns = [
        {title: '所属系统', dataIndex: 'systemName'},
        {title: '角色名称', dataIndex: 'name'},

        {
            title: '启用', dataIndex: 'status',
            render: (value) => value === '1' || value === true ? '是' : '否',
        },
        {title: '备注', dataIndex: 'remark'},
        {
            title: '操作', dataIndex: 'operator', width: 100,
            render: (text, record) => {
                const {id} = record;
                const items = [
                    {
                        label: '编辑',
                        onClick: () => setRecord(record) || setVisible(true),
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: '您确定删除吗？',
                            onConfirm: () => handleDelete(id),
                        },
                    },
                ];
                return <Operator items={items}/>;
            },
        },
    ];

    async function handleDelete(id) {
        await deleteRole({id: id}, {successTip: '删除成功！'});

        // 触发查询
        setConditions({...conditions});
    }

    const layout = {
        wrapperCol: {style: {width: 200}},
    };

    return (
        <PageContent fitHeight className={styles.root} loading={loading}>
            <QueryBar showCollapsedBar={IS_MOBILE}>
                {(collapsed) => {
                    const hidden = IS_MOBILE && collapsed;
                    return (
                        <Form
                            name="user"
                            layout="inline"
                            form={form}
                            onFinish={values => {
                                setPageNum(1);
                                setConditions(values);
                            }}
                        >
                            <FormItem
                                {...layout}
                                label="角色名称"
                                name="name"
                            />
                            <FormItem
                                {...layout}
                                hidden={hidden}
                                type="select"
                                label="角色状态"
                                name="status"
                                options={[
                                    {value: '1', label: '启用'},
                                    {value: '0', label: '停用'},
                                ]}
                            />
                            <FormItem
                                {...layout}
                                hidden={hidden}
                                label="所属系统"
                                name="systemId"
                            >
                                <SystemSelect showSearch/>
                            </FormItem>
                            <FormItem>
                                <Space>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <Button htmlType="reset">重置</Button>
                                </Space>
                            </FormItem>
                        </Form>
                    );
                }}
            </QueryBar>
            <ToolBar>
                <Button type="primary" onClick={() => setRecord(null) || setVisible(true)}>添加</Button>
            </ToolBar>
            <Table
                fitHeight={!IS_MOBILE}
                scroll={IS_MOBILE ? {x: 1000} : undefined}
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <Pagination
                total={total}
                pageNum={pageNum}
                pageSize={pageSize}
                onPageNumChange={setPageNum}
                onPageSizeChange={pageSize => setPageNum(1) || setPageSize(pageSize)}
            />
            <EditModal
                fullScreen={IS_MOBILE}
                width={IS_MOBILE ? '100%' : '70%'}
                visible={visible}
                isEdit={!!record}
                record={record}
                onOk={() => setVisible(false) || setConditions({...conditions})}
                onCancel={() => setVisible(false)}
            />
        </PageContent>
    );
});
