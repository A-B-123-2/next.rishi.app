import { Fragment } from 'react'
import SEO from '@/components/Seo'
import TimelineItem from '@/components/TimelineItem'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const About = ({ Timeline, aboutTagline, origin }) => {
  const SEODetails = {
    title: `About Me - Rishi Raj Jain`,
    canonical: `https://${origin}/about`,
  }
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <h1 className="font-bold text-2xl sm:text-5xl">About Me</h1>
      <h2
        dangerouslySetInnerHTML={{
          __html: new RichTextResolver().render(aboutTagline),
        }}
        className="mt-5 dark:text-gray-400 font-regular text-md sm:text-xl whitespace-pre-line"
      />
      <h1 className="mt-16 font-bold text-2xl sm:text-5xl">My Timeline</h1>
      {Object.keys(Timeline)
        .sort((a, b) => (a > b ? -1 : 1))
        .map((item) => (
          <Fragment key={item}>
            <span className="mt-8 font-bold text-lg">{item}</span>
            {Timeline[item].map((exp) => (
              <TimelineItem key={exp.content.Title} {...exp['content']} />
            ))}
          </Fragment>
        ))}
    </Fragment>
  )
}

export default About

export async function getServerSideProps({ req }) {
  let origin = req.headers['host']
  const resp = await fetch(`https://${origin}/api/about`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  return {
    props: { ...data, origin },
  }
}
