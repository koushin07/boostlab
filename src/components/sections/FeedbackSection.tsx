import { Star, Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import type { Testimonial } from "@/pages/Index"

interface FeedbackProps {
  duplicate: Testimonial[]
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="w-[280px] sm:w-[320px] h-[320px] sm:h-[350px] mx-2 sm:mx-4 bg-card/40 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
      <CardContent className="p-4 sm:p-6 h-full flex flex-col">
        {/* Quote icon at top */}
        <div className="flex justify-end mb-3">
          <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-primary/40 group-hover:text-primary transition-colors" />
        </div>

        {/* Comment - main content */}
        <div className="flex-1 mb-4">
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base italic">"{testimonial.comment}"</p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.star ? "text-secondary fill-secondary" : "text-muted"}`}
            />
          ))}
        </div>

        {/* Author info at bottom */}
        <div className="text-center border-t border-border/50 pt-4">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg">
            {testimonial.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{testimonial.title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const FeedbackSection = ({ duplicate }: FeedbackProps) => {
  // Create multiple copies for seamless infinite scroll
  const infiniteTestimonials = [...duplicate, ...duplicate, ...duplicate, ...duplicate]

  return (
    <section
      id="reviews"
      className="w-full py-12 sm:py-20 scroll-fade-edges relative z-10 overflow-hidden bg-gradient-to-b from-background via-primary/50 to-background"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="container mx-auto px-2 sm:px-4 relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-40">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4" style={{ color: "#FFFFFF" }}>
            What Our <span style={{ color: "#01719F" }}> Customers Say</span>
          </h2>
          <p className="text-sm sm:text-lg opacity-70 px-4 sm:px-0" style={{ color: "#FFFFFF" }}>
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            Boost Lab.
          </p>
        </div>

        {/* Infinite Scroll Container with Fade Edges */}
        <div className="relative h-[340px] sm:h-[370px] overflow-hidden">
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {infiniteTestimonials.map((testimonial, index) => (
              <div key={`${index}`} className="flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default FeedbackSection
