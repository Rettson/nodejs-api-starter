export default function validate(schema) {
    return (req, res, next) => {
        try {
            const validated = schema.parse(req.body);

            req.body = validated;

            next();
        } catch (e) {
            const errors = [];
            e.errors.forEach(error => {
                errors.push(`${error.path[0]} ${error.message}`)
            });

            res.status(400).json({ errors });
        }
    }
}