/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

//import './NotFoundPage.less';
import React from 'react/addons'; // eslint-disable-line no-unused-vars

class NotFoundPage {

  render() {
    return (
      <div>
        <h1 className="text-center">Page Not Found</h1>
        <p  className="text-center">Oops! Sorry but the page you were trying to view does not exist. Please click the back button to return to the previous result or check your URL.</p>
      </div>
    );
  }

}

export default NotFoundPage;
