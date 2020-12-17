import React from "react"
import Layout from "../components/Layout"
import View from "../components/View"
import Status from "../components/Status"
import { Link, graphql } from "gatsby"
// import Layout from "../layouts"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"

const Index = props => {
  const posts = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <Status />
      <View title="Simple Authentication Example">
        <p>
          This is a simple example of creating dynamic apps with Gatsby that
          require user authentication. It uses concepts from the
          {` `}
          <a href="https://www.gatsbyjs.com/docs/client-only-routes-and-user-authentication/">
            client-only routes section
          </a>
          {` `}
          of the “Building Apps with Gatsby” documentation.
        </p>
        <p>
          For the full experience, go to
          {` `}
          <Link to="/app/profile">your profile</Link>.
        </p>
      </View>
      <ul
        css={{
          marginBottom: rhythm(2),
          marginTop: rhythm(2),
          marginLeft: 0,
          listStyle: `none`,
        }}
      >
        {posts.map(post => (
          <li key={post.node.fields.slug}>
            <span
              css={{
                color: styles.colors.light,
                display: `block`,
                [presets.Tablet]: {
                  float: `right`,
                  marginLeft: `1rem`,
                },
              }}
            >
              {post.node.frontmatter.date}
            </span>
            <Link to={post.node.fields.slug} className="link-underline">
              {post.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
