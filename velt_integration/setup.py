"""
Setup script for Velt Integration SDK
"""
import os
from setuptools import setup, find_packages

setup(
    name="velt-integration",
    version="0.1.0",
    description="Python SDK for integrating Velt comments, reactions, attachments, and user management into Django applications",
    long_description=open("README.md").read() if os.path.exists("README.md") else "",
    long_description_content_type="text/markdown",
    author="Velt",
    author_email="support@velt.dev",
    url="https://github.com/samarth-velt/velt-integration-python",
    packages=find_packages(),
    install_requires=[
        "pymongo[tls,srv]==4.6.3",
        "mongoengine==0.27.0",
        "blinker==1.8.2",
        "python-dateutil==2.8.2",
        "requests>=2.25.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=4.0.0",
            "mongomock>=4.1.2",
            "responses>=0.23.0",
        ],
    },
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Framework :: Django",
    ],
)

