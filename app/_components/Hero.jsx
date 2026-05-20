import React from 'react'

const Hero = () => {
  return (
    <section className=" lg:grid  lg:place-content-center dark:bg-gray-900">
  <div className="mx-auto  max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 ">
    <div className="mx-auto max-w-prose text-center ">
      <h1 className="text-4xl font-bold  sm:text-6xl text-primary-foreground">
        Create your Form in{" "}
        <strong className="bg-brand-gradient bg-clip-text text-transparent">Seconds</strong>{" "}
        
      </h1>

      <p className="mt-4 text-base text-pretty sm:text-lg/relaxed text-gray-400 ">
        Generate professional forms in seconds just by describing your goals. Skip the manual dragging and coding—let AI handle the build for you.
      </p>

      <div className="mt-4 flex justify-center flex-col sm:flex-row gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-primary bg-primary px-5 py-3 text-foreground shadow-sm transition-colors hover:bg-secondary hover:border-secondary"
          href="#"
        >
          + Create AI Form
        </a>

        <a
          className="inline-block rounded border border-gray-200 px-5 py-3  text-gray-400 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero
