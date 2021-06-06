import executeSql from './db';

export default {
    // 用户登录
    'post /login': async (config) => {
        const {
            userName,
            password,
        } = JSON.parse(config.data);

        const result = await executeSql('select * from users where account=? and password=?', [userName, password]);
        if (!result?.length) return [400, {message: '用户名或密码错误'}];

        const user = result[0];
        user.token = 'test token';

        return [200, user];
    },
    // 退出登录
    'post /logout': {},
    // 查询用户列表
    'get /users': async (config) => {
        const {
            pageSize,
            pageNum,
            // name,
            // mobile,
        } = config.params;

        const list = await executeSql('select * from users order by updatedAt desc limit ? offset ?', [pageSize, (pageNum - 1) * pageSize]);
        const countResult = await executeSql('select count(*) from users');
        const total = countResult[0]['count(*)'] || 0;

        return [200, {
            total,
            list,
        }];
    },

    // 获取用户详情
    'get re:/users/.+': async config => {
        const id = config.url.split('/')[2];

        const result = await executeSql('select * from users where id = ?', [id]);

        if (!result[0]) return [200, null];

        const userRoles = await executeSql('select * from user_roles where userId = ?', [id]);
        result[0].roleIds = userRoles.map(item => item.roleId);

        return [200, result[0]];
    },
    // 保存用户
    'post /users': async config => {
        const {
            account,
            name,
            password,
            email,
            mobile,
            roleIds,
        } = JSON.parse(config.data);
        const args = [account, name, password, mobile, email, true];
        const result = await executeSql('INSERT INTO users (account, name, password, mobile, email, enable) VALUES (?, ?, ?, ?, ?, ?)', args, true);
        const {insertId: userId} = result;

        if (roleIds?.length) {
            for (let roleId of roleIds) {
                await executeSql('INSERT INTO user_roles (roleId, userId) VALUES (?,?)', [roleId, userId]);
            }
        }

        return [200, userId];
    },
    // 修改用户
    'put /users': async config => {
        const {
            id,
            account,
            name,
            password,
            email,
            mobile,
            roleIds,
        } = JSON.parse(config.data);
        const args = [account, name, password, mobile, email, id];

        await executeSql('UPDATE users SET account=?, name=?, password=?, mobile=?, email=? WHERE id=?', args);
        await executeSql('DELETE FROM user_roles WHERE userId=?', [id]);

        if (roleIds?.length) {
            for (let roleId of roleIds) {
                await executeSql('INSERT INTO user_roles (roleId, userId) VALUES (?,?)', [roleId, id]);
            }
        }

        return [200, true];

    },
    // 删除用户
    'delete re:/users/.+': async config => {
        const id = config.url.split('/')[2];
        await executeSql('DELETE FROM users WHERE id=?', [id]);
        await executeSql('DELETE FROM user_roles WHERE userId=?', [id]);
        return [200, true];
    },
};
