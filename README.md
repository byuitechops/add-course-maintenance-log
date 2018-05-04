# Add Course Maintenance Log
### *Package Name*: add-course-maintenance-log
### *Child Type*: post
### *Platform*: online and pathway
### *Required*: Recommended

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

Add a Course Maintenance Log as a module item to Instructor Resources as the last item in Standard Resources. This allows the changes in the course to be tracked.

## How to Install

```
npm install add-course-maintenance-log
```

## Run Requirements

Must run after action-series-master. 

- action-series-master has a grandchild that deletes the old Course Maintenance Log, and will delete the new one being created in this child module if it is not run after action-series-master 

## Options

None

## Outputs

None

## Process

1. Get the Instructor Resources module
2. Get the Supplemental Resources module item
3. Use the Supplemental Resources module item position attribute to determine where to put the new module item, the Course Maintenance Log external tool
4. Make a POST request and create the new module item at the position of the Supplemental Resources module item
5. Call the callback

## Log Categories

- Added Course Maintenance Log

## Requirements

Add the Course Maintenance Log external tool as a new module item in Instructor Resources as the last item under the Standard Resources SubHeader.