/*****************************************************************
 * Description
 * Add the Course Maintenance Log External Tool as a module item 
 * to the Instructor Resources module in each course. It should 
 * be the last item under the Standard Resources sub-header.
 *****************************************************************/
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    var validPlatforms = ['online', 'pathway'];
    if (!validPlatforms.includes(course.settings.platform)) {
        course.message('Invalid platform. Skipping child module');
        stepCallback(null, course);
        return;
    }

    /* Get the Instructor Resources module */
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules?search_term=Instructor Resources`, (err, currModule) => {
        if (err) {
            course.error(new Error(err));
            stepCallback(null, course);
            return;
        }
        if (currModule.length === 0) {
            course.warning(`Instructor Resources module not found`);
            stepCallback(null, course);
            return;
        }
        /* Get the Supplemental Resources SubHeader to know where to position the new module item (right before it) */
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules/${currModule[0].id}/items?search_term=Supplemental Resources`, (err, moduleItems) => {
            if (err) {
                course.error(new Error(err));
                stepCallback(null, course);
                return;
            }
            if (moduleItems.length === 0) {
                course.warning(`Supplemental Resources SubHeader not found`);
                moduleItems.push({
                    position: 1
                });
            }
            /* Make the Course Mainentance Log External Tool module Item */
            canvas.post(`/api/v1/courses/${course.info.canvasOU}/modules/${currModule[0].id}/items`, {
                'module_item': {
                    'type': 'ExternalTool',
                    'content_id': 145, // Should be the same for every course, but may not be...
                    'external_url': 'https://web.byui.edu/iLearn/LTI/TDReporting/',
                    'published': false,
                    'new_tab': false,
                    'position': moduleItems[0].position,
                    'indent': 1,
                }
            }, (err, moduleItem) => {
                if (err) {
                    course.error(new Error(err));
                    stepCallback(null, course);
                    return;
                }

                /* Log it */
                course.log(`Added Course Maintenance Log`, {
                    'ID': moduleItem.id,
                    'Title': moduleItem.title,
                });

                stepCallback(null, course);
            });
        })
    });

};