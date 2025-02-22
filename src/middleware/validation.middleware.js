export default function validate(schema) {
    return async (req, res, next) => {
        try {
            const validated = schema.parse(req.body);

            req.body = validated;

            next();
        } catch (e) {
            let errors = {};
            e.errors.forEach(error => {
                errors[error.path[0]] = `${error.path[0]} ${error.message}`
            });

            return res.status(400).json({ errors });
        }
    }
}