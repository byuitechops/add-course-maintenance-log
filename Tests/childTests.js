/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

module.exports = (course, callback) => {
    tap.test('add-course-maintenance-log', (test) => {
        /* Get the Instructor Resources module */
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules?search_term=Instructor Resources`, (err, currModule) => {
        if (err) {
            course.error(new Error(err));
            test.end();
            callback(null);
            return;
        }
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules/${currModule[0].id}/items?search_term=Course Maintenance Log`, (err, moduleItem) => {
            if (err) {
                course.error(new Error(err));
                test.end();
                callback(null);
                return;
            }
            if (moduleItem.length !== 0) {
                test.equal(`Course Maintenance Log`, moduleItem.title);
            } 
            test.end();
    });

    });

    // Always call the callback in your childTests with just null
    callback(null);
};