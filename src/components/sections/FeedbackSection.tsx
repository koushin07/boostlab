"use client"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/pages/Index"



interface FeedbackProps {
  duplicate: Testimonial[]
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="w-[400px] mx-4 bg-card/40 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">

          <div className="flex-1">
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.title}
            </p>
          </div>
          <Quote className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.star ? "text-secondary fill-secondary" : "text-muted"}`}
            />
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm">{testimonial.comment}</p>
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
      className="w-full py-20 relative z-10 overflow-hidden bg-gradient-to-b from-background via-primary/50 to-background"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            What Our <span style={{ color: "#01719F" }}> Customers Say</span>
          </h2>
          <p className="text-lg opacity-70" style={{ color: "#FFFFFF" }}>
             Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            Boost Lab.
          </p>
        </div>


        {/* Infinite Scroll Container with Fade Edges */}
        <div className="relative h-[300px] overflow-hidden scroll-fade-edges">
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
