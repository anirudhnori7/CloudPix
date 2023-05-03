const builder = {
    expired: prefix => builder.prepare(417, prefix, 'expired.'),
    canceled: prefix => builder.prepare(419, prefix, 'canceled.'),
    created: prefix => builder.prepare(200, prefix, 'created.'),
    updated: prefix => builder.prepare(200, prefix, 'updated.'),
    deleted: prefix => builder.prepare(417, prefix, 'deleted.'),
    blocked: prefix => builder.prepare(401, prefix, 'blocked.'),
    success: prefix => builder.prepare(200, prefix, 'success.'),
    required: prefix => builder.prepare(419, prefix, 'required.'),
    delete_success: prefix => builder.prepare(200, prefix, 'deleted successfully.'),
    successfully: prefix => builder.prepare(200, prefix, 'successfully.'),
    error: prefix => builder.prepare(500, prefix, 'error.'),
    no_prefix: prefix => builder.prepare(200, prefix, ''),
    getString: key => (customMessages ? customMessages[key].message : ''),
    not_allowed: prefix => builder.prepare(409, prefix, 'not allowed.'),
    server_error: prefix => builder.prepare(500, prefix, 'Server Error!'),
};

Object.defineProperty(builder, 'prepare', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: (code, prefix, message) => ({
        code,
        message: `${prefix ? `${prefix} ${message}` : message}`,
    }),
});

export default builder;
