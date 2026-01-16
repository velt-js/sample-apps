# Security & Error Handling Fixes

## Summary

Fixed two security/error handling issues in the Django backend:

1. ✅ **Token endpoint JSON error handling** - Low Severity
2. ✅ **SSL certificate validation in production** - Medium Severity

---

## Issue 1: Token Endpoint JSON Error Handling (Fixed)

### Problem
The `tokens.py` endpoint lacked explicit `json.JSONDecodeError` handling that all other handlers implement. When malformed JSON was sent, the endpoint returned:
- ❌ HTTP 500 with `INTERNAL_ERROR` (incorrect - server error)

Instead of:
- ✅ HTTP 400 with `INVALID_INPUT` (correct - client error)

This was inconsistent with the API's error handling pattern.

### Location
`app/api/velt/backend/api/handlers/tokens.py`

### Fix Applied

**Before:**
```python
try:
    data = json.loads(request.body)
    # ... processing ...
    return JsonResponse(result)
except Exception as e:
    return JsonResponse({
        'success': False,
        'error': str(e),
        'errorCode': 'INTERNAL_ERROR',
        'statusCode': 500
    }, status=500)
```

**After:**
```python
try:
    data = json.loads(request.body)
    # ... processing ...
    return JsonResponse(result)
except json.JSONDecodeError:
    return JsonResponse({
        'success': False,
        'error': 'Invalid JSON',
        'errorCode': 'INVALID_INPUT',
        'statusCode': 400
    }, status=400)
except Exception as e:
    return JsonResponse({
        'success': False,
        'error': str(e),
        'errorCode': 'INTERNAL_ERROR',
        'statusCode': 500
    }, status=500)
```

### Testing
```bash
# Test with invalid JSON
curl -X POST http://localhost:8000/api/velt/token \
  -H "Content-Type: application/json" \
  -d '{invalid json}'

# Response (now correct):
# {"success": false, "error": "Invalid JSON", "errorCode": "INVALID_INPUT", "statusCode": 400}
```

---

## Issue 2: SSL Certificate Validation Disabled (Fixed)

### Problem
The MongoDB client was initialized with `tlsAllowInvalidCertificates=True`, which disables SSL certificate validation. While the comment said "Dev only", there was no environment check, making it active in production deployments.

**Security Risk:**
- Vulnerable to man-in-the-middle (MITM) attacks
- Production connections not properly validating SSL certificates
- Could allow attackers to intercept/modify data in transit

### Location
`app/api/velt/backend/api/store.py`

### Fix Applied

**Before:**
```python
_mongo_client = MongoClient(
    uri,
    maxPoolSize=10,
    minPoolSize=1,
    maxIdleTimeMS=30000,
    serverSelectionTimeoutMS=10000,
    socketTimeoutMS=45000,
    retryWrites=True,
    retryReads=True,
    tlsAllowInvalidCertificates=True,  # Dev only - fixes SSL cert issues on macOS
)
```

**After:**
```python
# Create client with connection pool settings suitable for Django
client_options = {
    'maxPoolSize': 10,
    'minPoolSize': 1,
    'maxIdleTimeMS': 30000,
    'serverSelectionTimeoutMS': 10000,
    'socketTimeoutMS': 45000,
    'retryWrites': True,
    'retryReads': True,
}

# Only allow invalid certificates in development (DEBUG=True)
# This fixes SSL cert issues on macOS during development
# NEVER enable this in production as it's vulnerable to MITM attacks
if getattr(settings, 'DEBUG', False):
    client_options['tlsAllowInvalidCertificates'] = True

_mongo_client = MongoClient(uri, **client_options)
```

### Behavior

**Development Mode** (`DEBUG=True` in `config/settings.py`):
- ✅ `tlsAllowInvalidCertificates=True` - Fixes macOS SSL issues
- Allows local development without certificate errors

**Production Mode** (`DEBUG=False`):
- ✅ `tlsAllowInvalidCertificates=False` (default) - Secure
- Full SSL certificate validation enabled
- Protected against MITM attacks

---

## Verification

### Django Configuration Check
```bash
cd app/api/velt/backend
python3 manage.py check
```
**Result:** ✅ `System check identified no issues (0 silenced).`

### API Endpoint Tests

**Test 1: Invalid JSON (Issue #1 Fix)**
```bash
curl -X POST http://localhost:8000/api/velt/token \
  -H "Content-Type: application/json" \
  -d '{invalid json}'
```
**Result:** ✅ Returns 400 with `INVALID_INPUT`

**Test 2: Valid Request**
```bash
curl -X POST http://localhost:8000/api/velt/comments/get \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"test"}'
```
**Result:** ✅ Returns 200 with `{"success": true, "result": {}, "statusCode": 200}`

**Test 3: SSL Configuration (Issue #2 Fix)**
- Development: SSL validation disabled (helps with macOS cert issues)
- Production: SSL validation enabled (secure by default)
- Configuration: Controlled by Django's `DEBUG` setting

---

## Files Modified

1. `app/api/velt/backend/api/handlers/tokens.py`
   - Added `json.JSONDecodeError` exception handling
   - Returns proper 400 status for malformed JSON

2. `app/api/velt/backend/api/store.py`
   - Made SSL certificate validation conditional on `DEBUG` setting
   - Secure by default in production
   - Added clear comments explaining security implications

---

## Security Best Practices Applied

1. ✅ **Proper HTTP Status Codes**
   - Client errors (malformed JSON) → 400 Bad Request
   - Server errors → 500 Internal Server Error

2. ✅ **SSL Certificate Validation**
   - Production: Always validate certificates (secure)
   - Development: Optional skip for local development (DEBUG=True)

3. ✅ **Consistent Error Handling**
   - All endpoints follow the same error handling pattern
   - Predictable API responses

4. ✅ **Clear Documentation**
   - Comments explain security implications
   - Warning about MITM vulnerability

---

## Production Deployment Checklist

Before deploying to production, ensure:

- [ ] `DEBUG=False` in `config/settings.py` or environment
- [ ] MongoDB Atlas connection uses valid SSL certificates
- [ ] `MONGODB_URI` uses `mongodb+srv://` (SSL enabled by default)
- [ ] Test all API endpoints return proper error codes
- [ ] Monitor logs for any SSL connection errors

---

## References

- [OWASP Top 10 - A02:2021 Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- [Django Security Best Practices](https://docs.djangoproject.com/en/4.2/topics/security/)
- [MongoDB SSL/TLS Configuration](https://www.mongodb.com/docs/manual/tutorial/configure-ssl/)
