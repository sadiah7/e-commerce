import React, { Fragment } from "react";
import "./contactus.css";

export const ContactUs = () => {
  return (
    <Fragment>
      <section class="w3l-simple-contact-form1">
        <div class="contact-form section-gap">
          <div class="wrapper">
            <div class="text-center">
              <h1>Contact Us</h1>
            </div>
            <div class="contact-form">
              <div class="form-mid">
                <form
                  action="https://formsubmit.co/f4431b38de413610b9a7545ea3bb38b3"
                  method="POST"
                >
                  <input type="hidden" name="_cc" value="" />
                  <input
                    type="hidden"
                    name="_blacklist"
                    value="spammy pattern, banned term, phrase"
                  />
                  {/* <!-- <input type="hidden" name="_autoresponse" value="We will contact you soon."> --> */}
                  {/* <!-- <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html"> --> */}
                  <input type="hidden" name="_template" value="table" />
                  <div class="field">
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      id="Name"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div class="field">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="Sender"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div class="field">
                    <input
                      type="text"
                      class="form-control"
                      name="subject"
                      id="Subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    class="form-control"
                    id="Message"
                    placeholder="Message"
                    required
                  ></textarea>
                  <button type="submit" class="btn btn-contact">
                    Send Message
                  </button>
                  {/* <!-- <input type="button" class="btn btn-contact" onclick="sendmail();"  value="Send Message"> --> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
