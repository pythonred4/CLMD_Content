---
title: "Submit Content"
description: "Share your content with our community anonymously and safely"
date: 2025-01-01T00:00:00Z
draft: false
---

<div class="content-submission-container">
    <div class="submission-header">
        <h1>📝 Submit Content</h1>
        <p>Share your articles, stories, poems, or other content with our community. All submissions are anonymous and will be reviewed before publication.</p>
    </div>

    <form name="content-submission" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="submission-form">
        <!-- Honeypot field for spam protection -->
        <div class="honeypot-field" style="display: none;">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </div>

        <!-- Hidden fields for Netlify -->
        <input type="hidden" name="form-name" value="content-submission" />
        <input type="hidden" name="submitted_at" value="" />

        <div class="form-group">
            <label for="title">Title *</label>
            <input type="text" id="title" name="title" required maxlength="200" placeholder="Enter your content title">
            <small>Maximum 200 characters</small>
        </div>

        <div class="form-group">
            <label for="content-type">Content Type *</label>
            <select id="content-type" name="content-type" required>
                <option value="">Select content type</option>
                <option value="article">Article</option>
                <option value="story">Story</option>
                <option value="poem">Poem</option>
                <option value="essay">Essay</option>
                <option value="review">Review</option>
                <option value="other">Other</option>
            </select>
        </div>

        <div class="form-group">
            <label for="author">Author Name (Optional)</label>
            <input type="text" id="author" name="author" maxlength="100" placeholder="Your name or pseudonym">
            <small>Leave blank to remain completely anonymous</small>
        </div>

        <div class="form-group">
            <label for="content">Content *</label>
            <textarea id="content" name="content" required maxlength="10000" rows="12" placeholder="Write your content here. Markdown is supported!"></textarea>
            <small>Maximum 10,000 characters. <a href="/markdown-editor/" target="_blank">Markdown Editor</a></small>
        </div>

        <div class="form-group">
            <label for="tags">Tags (Optional)</label>
            <input type="text" id="tags" name="tags" maxlength="200" placeholder="Enter tags separated by commas">
            <small>Example: technology, programming, tutorial</small>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="language">Language *</label>
                <select id="language" name="language" required>
                    <option value="">Select language</option>
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                    <option value="my">Myanmar</option>
                    <option value="th">Thai</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="content-rating">Content Rating *</label>
                <select id="content-rating" name="content-rating" required>
                    <option value="">Select rating</option>
                    <option value="G">G - General Audience</option>
                    <option value="PG">PG - Parental Guidance</option>
                    <option value="PG-13">PG-13 - Parental Guidance (13+)</option>
                    <option value="R">R - Restricted (17+)</option>
                    <option value="NC-17">NC-17 - Adults Only</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label for="notes">Additional Notes (Optional)</label>
            <textarea id="notes" name="notes" maxlength="500" rows="3" placeholder="Any additional context, requests, or notes for the editors"></textarea>
            <small>Maximum 500 characters</small>
        </div>

        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" name="terms-agreement" required>
                <span class="checkmark"></span>
                I agree to the <a href="/terms/" target="_blank">Terms of Service</a> and <a href="/privacy/" target="_blank">Privacy Policy</a> *
            </label>
        </div>

        <div class="form-group">
            <label class="checkbox-label">
                <input type="checkbox" name="content-original" required>
                <span class="checkmark"></span>
                I confirm this content is original or I have permission to share it *
            </label>
        </div>

        <div class="form-actions">
            <button type="submit" class="submit-btn">Submit Content</button>
            <button type="reset" class="reset-btn">Reset Form</button>
        </div>
    </form>

    <div class="submission-info">
        <h3>📋 What Happens Next?</h3>
        <ol>
            <li><strong>Submission Received:</strong> Your content is safely stored and processed</li>
            <li><strong>Content Review:</strong> Our team reviews and validates your submission</li>
            <li><strong>Formatting:</strong> Content is formatted and prepared for publication</li>
            <li><strong>Publication:</strong> Approved content is published to our site</li>
        </ol>

        <h3>🔒 Privacy & Security</h3>
        <ul>
            <li>All submissions are completely anonymous</li>
            <li>No personal information is collected or stored</li>
            <li>Content is processed securely through GitHub Actions</li>
            <li>Spam protection with honeypot fields and validation</li>
        </ul>

        <h3>📝 Content Guidelines</h3>
        <ul>
            <li>Content must be original or properly attributed</li>
            <li>Respectful and appropriate for the selected rating</li>
            <li>No spam, advertising, or inappropriate content</li>
            <li>Markdown formatting is supported</li>
        </ul>
    </div>
</div>

<script>
// Set submission timestamp when form loads
document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.querySelector('input[name="submitted_at"]');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Form validation and enhancement
    const form = document.querySelector('.submission-form');
    const contentField = document.getElementById('content');
    const titleField = document.getElementById('title');
    const tagsField = document.getElementById('tags');

    // Character counter for content
    if (contentField) {
        const updateCharCount = () => {
            const remaining = 10000 - contentField.value.length;
            const small = contentField.nextElementSibling;
            if (small) {
                small.innerHTML = `Maximum 10,000 characters. <span class="char-count ${remaining < 100 ? 'warning' : ''}">${remaining} remaining</span>. <a href="/markdown-editor/" target="_blank">Markdown Editor</a>`;
            }
        };
        contentField.addEventListener('input', updateCharCount);
        updateCharCount();
    }

    // Character counter for title
    if (titleField) {
        const updateTitleCount = () => {
            const remaining = 200 - titleField.value.length;
            const small = titleField.nextElementSibling;
            if (small) {
                small.innerHTML = `Maximum 200 characters. <span class="char-count ${remaining < 20 ? 'warning' : ''}">${remaining} remaining</span>`;
            }
        };
        titleField.addEventListener('input', updateTitleCount);
        updateTitleCount();
    }

    // Tags formatting
    if (tagsField) {
        tagsField.addEventListener('blur', function() {
            if (this.value) {
                // Clean up tags: remove extra spaces, commas, and format
                const tags = this.value
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0)
                    .join(', ');
                this.value = tags;
            }
        });
    }

    // Form submission handling
    if (form) {
        form.addEventListener('submit', function(e) {
            // Additional client-side validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            // Show submission message
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }
        });
    }
});
</script>