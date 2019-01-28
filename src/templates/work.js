import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class WorkPage extends React.Component {
  render() {
    const { data } = this.props

    const theater = data.markdownRemark.frontmatter.theatre.plays
    const film = data.markdownRemark.frontmatter.film.movies
    const new_media = data.markdownRemark.frontmatter.new_media.movies
    const education = data.markdownRemark.frontmatter.education.courses
    const skills = data.markdownRemark.frontmatter.special_skills.skills


    return (
      <Layout>
        <div id="theatre" className="resume_section">
          <header className="resume_header title is-3">Theatre</header>
          <table id="resume_table" class="table is-hoverable is-fullwidth">
            <thead>
              <th>Title</th>
              <th>Role</th>
              <th>Company</th>
              <th>Director</th>
            </thead>
            <tbody>
            {theater.map(credits => {
              return(
                <tr className="resume">
                  <td className="resume_item">{credits.title}</td>
                  <td className="resume_item middle-item">{credits.role}</td>
                  <td className="resume_item">{credits.company}</td>
                  <td className="resume_item">{credits.director}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <div id="film" className="resume_section">
          <header className="resume_header title is-3">Film</header>
          <table id="resume_table" class="table is-hoverable is-fullwidth">
            <thead>
              <th>Title</th>
              <th>Role</th>
              <th>Company</th>
              <th>Director</th>
            </thead>
            <tbody>
            {film.map(credits => {
              return(
                <tr className="resume">
                  <td className="resume_item">{credits.title}</td>
                  <td className="resume_item middle-item">{credits.role}</td>
                  <td className="resume_item">{credits.company}</td>
                  <td className="resume_item">{credits.director}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <div id="new_media" className="resume_section">
          <header className="resume_header title is-3">New Media</header>
          <table id="resume_table" class="table is-hoverable is-fullwidth">
            <thead>
              <th>Title</th>
              <th>Role</th>
              <th>Company</th>
              <th>Director</th>
            </thead>
            <tbody>
            {new_media.map(credits => {
              console.log("credits:", Object.keys(credits))
              return(
                <tr className="resume">
                  <td className="resume_item">{credits.title}</td>
                  <td className="resume_item middle-item">{credits.role}</td>
                  <td className="resume_item">{credits.company}</td>
                  <td className="resume_item">{credits.director}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <div id="education" className="resume_section">
          <header className="resume_header title is-3">Education</header>
          <table id="resume_table" class="table is-hoverable is-fullwidth">
            <thead>
              <th>Title</th>
              <th>School</th>
              <th>Instructor</th>
            </thead>
            <tbody>
            {education.map(credits => {
              return(
                <tr className="resume">
                  <td className="resume_item">{credits.title}</td>
                  <td className="resume_item middle-item">{credits.school}</td>
                  <td className="resume_item">{credits.instructor}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <div id="special_skills" className="resume_section">
          <header className="resume_header title is-3">Special Skills</header>
          <table id="resume_table" class="table is-hoverable is-fullwidth">
            <thead>
            </thead>
            <tbody>
            {skills.map(credits => {
              return(
                <tr className="resume">
                  <td className="resume_item">{credits.skill}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </Layout>
    )
  }
}

WorkPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query WorkQuery {
    markdownRemark(frontmatter: {templateKey: {eq: "work"}}) {
      frontmatter {
        title
        film {
          movies {
            title
            role
            company
            director
          }
        }
        theatre {
          plays {
            title
            role
            company
            director
          }
        }
        new_media {
          movies {
            title
            role
            company
            director
          }
        }
        education {
          courses {
            title
            school
            instructor
          }
        }
        special_skills {
          skills {
            skill
          }
        }
      }
    }
  }
`
