import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import {newCourse} from '../../../tools/mockData';

const ManageCoursePage = ({courses, authors, loadCourses, loadAuthors, ...props}) => {
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});

    console.log(course);
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }));

    }

    return (
        <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange}>

        </CourseForm>
    );
};
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired

};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.authors,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);