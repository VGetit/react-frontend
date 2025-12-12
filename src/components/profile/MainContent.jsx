import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig'
import { useAuth } from '../../context/AuthContext';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const solidStars = Math.round(rating);

  return (
    <div className="review-rating-stars">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <i
            key={starValue}
            className={`star-icon ${starValue <= solidStars ? 'fa-solid fa-star' : 'fa-regular fa-star'}`}
          ></i>
        );
      })}
    </div>
  );
};

const TestimonialCard = ({ review, isOwnReview }) => (
  <div className="review-card wow fadeInUp" data-wow-delay="0.2s">
    <div className="review-header">
      <div className="review-author-info">
        <h6 className="fw-bold mb-0">
          {review.user}
          {isOwnReview && <span className="badge bg-primary ms-2">Your Review</span>}
        </h6>
        <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
      </div>
      <div className="ms-auto">
        <StarRating rating={review.rating} />
      </div>
    </div>
    <p className="review-text">{review.text}</p>
  </div>
);

const ContactsTable = ({ contacts }) => (
  <div className="contacts-table-container wow fadeInUp" data-wow-delay="0.1s">
    <table className="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Level</th>
          <th scope="col" className="text-center">Verified Profile</th>
          <th scope="col" className="text-center">Social</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={index}>
            <td>{contact.name}</td>
            <td>{contact.level}</td>
            <td className="text-center">
              {contact.verified_profile ? (
                <i className="fa fa-check-circle text-success verified-icon" title="Verified"></i>
              ) : (
                <i className="fa fa-times-circle text-muted verified-icon" title="Not Verified"></i>
              )}
            </td>
            <td className="text-center">
              {contact.linkedin_link && (
                <a href={contact.linkedin_link} target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PhonesTable = ({ phones }) => (
  <div className="contacts-table-container wow fadeInUp" data-wow-delay="0.1s">
    <table className="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {phones.map((phones, index) => (
          <tr key={index}>
            <td>{phones.number}</td>
            <td>{phones.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const handleCommentSubmit = async (slug, text, rating, onCommentSuccess, commentId = null) => {
  try {
    if (commentId) {
      // Update existing comment
      await apiClient.put(`/companies/${slug}/comments/${commentId}/`, { text, rating });
    } else {
      // Create new comment
      await apiClient.post(`/companies/${slug}/comments/`, { text, rating });
    }
    if (onCommentSuccess) {
      onCommentSuccess();
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
    alert('Failed to submit comment. Please try again.');
  }
}

const AddCommentForm = ({ slug, onCommentSuccess, initialComment = null, onCancelEdit = null }) => {
  const { authToken, user } = useAuth();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form fields when initialComment changes
  useEffect(() => {
    if (initialComment) {
      setText(initialComment.text || '');
      setRating(initialComment.rating || 0);
    } else {
      setText('');
      setRating(0);
    }
  }, [initialComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text || rating === 0) {
      alert('Please write a review and select a rating.');
      return;
    }
    if (!authToken) {
      alert('You must be logged in to submit a review.');
      return;
    }

    setIsSubmitting(true);
    await handleCommentSubmit(
      slug, 
      text, 
      rating, 
      onCommentSuccess,
      initialComment?.id
    );
    
    if (!initialComment) {
      setText('');
      setRating(0);
    }
    
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setText('');
    setRating(0);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="add-comment-form wow fadeInUp" data-wow-delay="0.3s">
      <h3 className="form-title">{initialComment ? 'Update Your Review' : 'Leave a Review'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="rating-input-container">
          <label>Your Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`star-icon interactive ${(hoverRating || rating) >= star ? 'fa-solid fa-star' : 'fa-regular fa-star'}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              ></i>
            ))}
          </div>
        </div>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Share your experience..."
          value={text}
          disabled={!authToken || isSubmitting}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {!authToken && <p className="text-muted mt-2">You must be logged in to submit a review.</p>}
        <div className="mt-3">
          <button 
            disabled={!authToken || isSubmitting} 
            type="submit" 
            className="btn btn-primary"
          >
            {isSubmitting ? 'Submitting...' : (initialComment ? 'Update Review' : 'Submit Review')}
          </button>
        </div>
      </form>
    </div>
  );
};

function MainContent({ slug, about, location, phones, verifications, reviews, contacts, onRefresh, registration_date, legal_status, origin_country }) {
  const { user } = useAuth();

  // Find user's own comment if logged i
  const userComment = user && reviews ? reviews.find(review => review.user === user) : null;

  return (
    <>
      <div className="section-title position-relative mb-4 pb-4">
        <h3 className="mb-2">About Company</h3>
      </div>
      <p className="mb-5">{about}</p>
      {registration_date && (
        <p className="mb-2"><strong>Registration Date:</strong> {registration_date}</p>
      )}
      {legal_status && (
        <p className="mb-2"><strong>Legal Status:</strong> {legal_status}</p>
      )}
      {origin_country && (
        <p className="mb-5"><strong>Origin Country:</strong> {origin_country}</p>
      )}

      <div className="section-title position-relative mb-4 pb-4">
        <h3 className="mb-2">Location</h3>
      </div>
      <p className="mb-5">{location.address}</p>

      <div className="section-title position-relative mb-4 pb-4">
        <h3 className="mb-2">Score Details</h3>
      </div>
      <div className="row g-4 mb-5">
        <div className="col-md-4 wow fadeIn" data-wow-delay="0.2s">
            <div className="verification-stat-card">
                <i className={`fa-solid fa-phone fa-2x mb-2 ${verifications.phone ? 'text-primary' : 'text-muted'}`}></i>
                <h5 className="mb-1">Phone Verified</h5>
                <p className="mb-0 fw-bold">{verifications.phone ? '+1' : 'Not Verified'}</p>
            </div>
        </div>
        <div className="col-md-4 wow fadeIn" data-wow-delay="0.4s">
            <div className="verification-stat-card">
                <i className={`fa-solid fa-address-book fa-2x mb-2 ${verifications.address ? 'text-primary' : 'text-muted'}`}></i>
                <h5 className="mb-1">Address Verified</h5>
                <p className="mb-0 fw-bold">{verifications.address ? '+1' : 'Not Verified'}</p>
            </div>
        </div>
        <div className="col-md-4 wow fadeIn" data-wow-delay="0.6s">
            <div className="verification-stat-card">
                <i className={`fa-solid fa-people-group fa-2x mb-2 ${verifications.employees ? 'text-primary' : 'text-muted'}`}></i>
                <h5 className="mb-1">Contacts</h5>
                <p className={`mb-0 fw-bold`}>{verifications.employees ? '+1' : 'Not Verified'}</p>
            </div>
        </div>
      </div>

      <div className="section-title position-relative mt-5 mb-4 pb-4">
        <h3 className="mb-2">Telephones ({phones.length})</h3>
      </div>
      {phones && phones.length > 0 ? (
        <PhonesTable phones={phones} />
      ) : (
        <p>No telephone information available.</p>
      )}

      <div className="section-title position-relative mt-5 mb-4 pb-4">
        <h3 className="mb-2">Contacts ({contacts.length})</h3>
      </div>
      {contacts && contacts.length > 0 ? (
        <ContactsTable contacts={contacts} />
      ) : (
        <p>No contact information available.</p>
      )}

      <div className="section-title position-relative mt-5 mb-4 pb-4">
        <h3 className="mb-2">Reviews</h3>
      </div>
      
      {userComment && (
        <div className="mb-4">
          <div className="alert alert-info" role="alert">
            <i className="fas fa-info-circle me-2"></i>
            <strong>You have already reviewed this company.</strong> When you submit a new review below, it will update your existing review.
          </div>
          <TestimonialCard 
            review={userComment} 
            isOwnReview={true}
          />
        </div>
      )}
      
      {reviews && reviews.length > 0 ? (
        reviews
          .filter(comment => !userComment || comment.id !== userComment.id)
          .map(comment => (
            <TestimonialCard 
              key={comment.id} 
              review={comment} 
              isOwnReview={false}
            />
          ))
      ) : (
        !userComment && <p>Be the first to leave a comment!</p>
      )}

      
      <div className="section-title position-relative mt-5 mb-4 pb-4">
        <h3 className="mb-2">Your Opinion Matters</h3>
      </div>
      <AddCommentForm 
        key={userComment?.id || 'new'}
        slug={slug} 
        onCommentSuccess={() => {
          onRefresh();
        }}
        initialComment={userComment}
      />
    </>
  );
}

export default MainContent;